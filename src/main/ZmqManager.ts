import { connectionHandler } from '@main/ConnectionHandler'
import { ServerAccess } from '@main/ServerManager'
import { pedro } from '@models/index'
import { uniq } from 'lodash'
import { Server, Socket } from 'socket.io'
import { Message, Request, Subscriber } from 'zeromq'

class TimeoutError extends Error {
  constructor(msg = 'ZMQ request timed out') {
    super(msg)
    this.name = 'TimeoutError'
  }
}
export class ZmqManager {
  private last: Promise<any> = Promise.resolve()
  private endpointReq = `tcp://localhost:5556`
  private endpointSub = `tcp://localhost:5557`

  private req: Request = new Request({
    linger: 0,
    routingId: 'HMI'
  })
  private sub: Subscriber = new Subscriber({
    linger: 0
  })

  private reqConnected = false
  private subUser: Record<string, Record<string, boolean>> = {}
  private subTopics: Record<string, boolean> = {}

  //destroy 호출하면 true, eventListener, subscribeLoop break용
  private isDestroyed = false

  constructor(
    private wss: Server,
    private server: ServerAccess
  ) {
    this.sub.subscribe('')
    void this.reqEvent()
    void this.subEvent()
    this.connect()
    void this.subscribeLoop()
    this.wss.on('connection', (socket) => this.onConnection(socket))
  }

  public connect() {
    this.req.connect(this.endpointReq)
    this.sub.connect(this.endpointSub)
  }

  private onConnection(socket: Socket) {
    this.subUser[socket.id] = {}
    connectionHandler.add(socket)

    socket.on('disconnect', () => {
      connectionHandler.remove(socket.id)
      this.unsubscribeAll(socket.id)
    })

    socket.on('req', (msg: Uint8Array, callback: (res: any) => void) => {
      const data = pedro.REQ.decode(msg)
      if (data.action === 'subscribe') {
        this.subscribe(socket.id, JSON.parse(data.jsonData).topic)
        callback(connectionHandler.repSuccess(data.uuid))
      } else if (data.action === 'unsubscribe') {
        this.unsubscribe(socket.id, JSON.parse(data.jsonData).topic)
        callback(connectionHandler.repSuccess(data.uuid))
      } else {
        this.request(msg).then((res) => {
          callback(res)
        })
      }
    })
  }

  private async reqEvent() {
    try {
      for await (const evt of this.req.events) {
        if (this.isDestroyed) {
          break
        }
        if (evt.type === 'connect') {
          this.reqConnected = true
        } else if (evt.type === 'disconnect' || evt.type === 'close') {
          this.reqConnected = false
          this.req.connect(this.endpointReq)
        }
      }
    } catch (e: any) {
      if (e?.code !== 'ENOTSOCK' && e?.errno !== 128) {
        console.error('zmq reqEvent Error', e)
      }
    }
  }

  private async subEvent() {
    try {
      for await (const evt of this.sub.events) {
        if (this.isDestroyed) {
          break
        }
        if (evt.type === 'disconnect' || evt.type === 'close') {
          this.sub.subscribe('')
          this.sub.connect(this.endpointSub)
        }
      }
    } catch (e: any) {
      console.error('subEvent error :', e)
      if (e?.code !== 'ENOTSOCK' && e?.errno !== 128) {
        console.error('zmq subEvent Error', e)
      }
    }
  }

  public subscribe(socketId: string, topic: string) {
    if (!this.subUser[socketId][topic]) {
      this.subUser[socketId][topic] = true
    }
    if (!this.subTopics[topic]) {
      this.subTopics[topic] = true
    }
  }

  public unsubscribe(socketId: string, topic: string) {
    delete this.subUser[socketId][topic]
    if (!uniq(Object.keys(Object.values(this.subUser))).includes(topic)) {
      delete this.subTopics[topic]
    }
  }

  public unsubscribeAll(socketId: string) {
    const subUserSocket = this.subUser[socketId]
    if (this.subUser[socketId]) {
      delete this.subUser[socketId]
      const subUserVal = Object.values(this.subUser).reduce((accum, cur) => {
        accum = { ...accum, ...cur }
        return accum
      }, {})
      const allSubTopics = Object.keys(subUserVal)
      Object.keys(subUserSocket).forEach((topic) => {
        if (!uniq(allSubTopics).includes(topic)) {
          delete this.subTopics[topic]
        }
      })
    }
  }

  private async subscribeLoop(): Promise<void> {
    try {
      for await (const [topicBuf, dataBuf] of this.sub) {
        if (this.isDestroyed) break
        const topic = (topicBuf.toString() ?? '').trim()
        if (topic !== '') {
          if (topic === 'robot_alarm') {
            await this.server.insertAlarm(pedro.RobotAlarm.decode(dataBuf))
          }
          if (this.subTopics[topic]) {
            Object.keys(this.subUser).forEach((socketId: string) => {
              if (topic === 'robot_alarm') {
                try {
                  this.server.selectAlarm().then((res) => {
                    connectionHandler.emitToSocket(topic, { data: res }, socketId)
                  })
                } catch (_e) {
                  //
                }
              } else {
                if (this.subUser[socketId][topic]) {
                  connectionHandler.emitToSocket(topic, { data: dataBuf }, socketId)
                }
              }
            })
          }
        }
      }
    } catch (e) {
      if (!this.isDestroyed) {
        console.error('subscribeLoop error', e)
      }
    }
  }

  private async recreateReq() {
    // 소켓 close 전 보냈던 request 처리 방법
    // 양수 해당 ms 동안 전송 시도 그 시간 안에 못 보내면 버리고 close 실행
    // 0	대기 없이 즉시 close 가능
    // 음수	무한정 대기, 모든 메시지를 보낼 때까지 close되지 않음
    this.req.linger = 0
    // 인스턴스 죽이고
    this.req.close()
    // 문제생기면 인스턴스 다시 생성
    this.req = new Request({
      linger: 0,
      routingId: 'HMI'
    })
    this.reqConnected = false
    void this.reqEvent()
    this.req.connect(this.endpointReq)
  }

  private withTimeout<T>(p: Promise<T>, ms: number): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const t = setTimeout(() => reject(new TimeoutError()), ms)
      p.then(
        (v) => {
          clearTimeout(t)
          resolve(v)
        },
        (e) => {
          clearTimeout(t)
          reject(e)
        }
      )
    })
  }

  private runQueued<T>(job: () => Promise<T>): Promise<T> {
    const p = this.last.then(job, job)
    this.last = p.then(
      () => {},
      () => {}
    )
    return p
  }

  public request(msg: Uint8Array, timeoutMs = 3000): Promise<Message> {
    return this.runQueued(async () => {
      if (!this.reqConnected) {
        // 연결되지 않은 상태라면 재연결 시도 먼저
        this.req.connect(this.endpointReq)
      }
      try {
        await this.req.send(Buffer.from(msg))
        const [frame] = await this.withTimeout(this.req.receive(), timeoutMs)
        return frame
      } catch (err) {
        console.error(err)
        await this.recreateReq()
        return Buffer.from(
          pedro.REP.encode({
            result: 'fail',
            jsonData: JSON.stringify({ message: 'Timeout Error' })
          }).finish()
        )
      }
    })
  }

  public destroy() {
    this.isDestroyed = true
    this.req.linger = 0
    this.req.close()
    this.sub.close()
  }
}
