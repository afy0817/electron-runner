import { pedro } from '@models/index'
import { isEmpty } from 'lodash'
import { io, Socket } from 'socket.io-client'
import { v4 as uuid } from 'uuid'

export class SocketManager {
  private isConnected: boolean = false
  uri: string
  path: string
  socket: Socket
  topicsModel = {
    robot_alarm: pedro.RobotAlarmList
  }
  subscribeMap: Record<string, { data?: any; callback: CallableFunction }> = {}
  requestMap: Record<string, { data?: any; callback: CallableFunction }> = {}
  reconnectTimeout: number = 2000
  reconnecting = false
  constructor(data: {
    path: string
    initSubscribe?: Record<string, { data?: any; callback: CallableFunction }>
    initRequest?: Record<string, { data?: any; callback: CallableFunction }>
  }) {
    this.uri = `http://${window.location.hostname}:9417`
    this.path = data.path
    this.socket = io(this.uri, {
      path: this.path,
      reconnection: false,
      autoConnect: false,
      transports: ['websocket'],
      timeout: 5_000
    })
    this.subscribeMap = data.initSubscribe ?? {}
    this.requestMap = data.initRequest ?? {}
    this.socket.once('connect', this.firstConnect)
    this.socket.on('connect', this.onConnect)
    this.socket.on('connect_error', this.onDisconnect)
    this.socket.on('connect_timeout', this.onDisconnect)
    this.socket.on('disconnect', this.onDisconnect)
    this.socket.connect()
  }

  // true면 원격호출 false면 hmi 내부 renderer 호출
  get isRemote() {
    return (window as any).electronAPI === undefined
  }

  firstConnect = () => {
    if (!isEmpty(this.requestMap)) {
      for (const key in this.requestMap) {
        const val = this.requestMap[key]
        this.req(key, val.data).then((res: pedro.REP) => {
          val.callback(res)
          delete this.requestMap![key]
        })
      }
    }
  }

  onConnect = () => {
    this.isConnected = true
    console.log(
      `%c${this.path} Socket connected`,
      'background-color: white; color: green; font-size: 16px; font-weight: bold;'
    )
    this.reconnecting = false
    for (const key in this.subscribeMap) {
      void this.sub(key, this.subscribeMap[key])
    }
  }

  async onDisconnect() {
    this.isConnected = false
    console.error(
      `%c${this.path} Socket Disconnected`,
      'background-color: black; color: red; font-size: 16px; font-weight: bold;'
    )

    if (!this.reconnecting) {
      this.reconnecting = true
      while (!this.isConnected) {
        console.log(`${this.path} Socket retry connecting...`, new Date())
        this.socket.connect()
        await new Promise((resolve) => setTimeout(resolve, this.reconnectTimeout))
      }
    }
  }

  encodeReq(topic: string, data: any) {
    return pedro.REQ.encode({
      uuid: uuid(),
      action: topic,
      jsonData: JSON.stringify({ ...data, isRemote: this.isRemote }),
      from: 'HMI'
    }).finish()
  }

  decodeRep(res: Uint8Array): pedro.REP {
    return pedro.REP.decode(new Uint8Array(res))
  }

  decodeSub(topic: string, data: any) {
    if (this.topicsModel[topic] !== undefined) {
      return this.topicsModel[topic].fromObject(
        this.topicsModel[topic].decode(new Uint8Array(data)),
        {
          defaults: true
        }
      )
    } else {
      return data
    }
  }

  req(topic: string, data?: any): Promise<pedro.REP> {
    return new Promise((resolve) => {
      this.socket.emit('req', this.encodeReq(topic, data), (res: Uint8Array) => {
        resolve(this.decodeRep(res))
      })
    })
  }

  sub(topic: string, option: { callback: CallableFunction; data?: any }): Promise<boolean> {
    return new Promise((resolve) => {
      this.req('subscribe', {
        topic: topic,
        isRemote: this.isRemote,
        ...(option.data ?? {})
      }).then((res: pedro.REP) => {
        if (res.result === 'success') {
          this.subscribeMap[topic] = option
          this.socket.on(topic, (msg: any) => {
            this.subscribeMap[topic].callback(this.decodeSub(topic, msg.data))
          })
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }

  unsub(topic: string): Promise<boolean> {
    return new Promise((resolve) => {
      this.req('unsubscribe', { topic: topic }).then((res: pedro.REP) => {
        if (res.result === 'success') {
          this.socket.off(topic)
          delete this.subscribeMap[topic]
          resolve(true)
        } else {
          resolve(false)
        }
      })
    })
  }
}
