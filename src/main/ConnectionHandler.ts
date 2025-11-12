import { pedro } from '@models/index'
import type { Socket } from 'socket.io'

class ConnectionHandler {
  private sockets: Record<string, Socket> = {}

  add(socket: Socket) {
    this.sockets[socket.id] = socket
  }

  remove(socketId: string) {
    delete this.sockets[socketId]
  }

  emitToSocket(event: string, data: any, socketId: string): void {
    const socket = this.sockets[socketId]
    if (socket !== undefined) {
      socket.emit(event, data)
    }
  }

  repSuccess(uuid: string, data?: any) {
    return pedro.REP.encode({
      uuid: uuid,
      result: 'success',
      jsonData: data ? JSON.stringify(data) : '{}'
    }).finish()
  }

  repFailed(uuid: string, message: string) {
    return pedro.REP.encode({
      uuid: uuid,
      result: 'fail',
      jsonData: JSON.stringify({ message })
    }).finish()
  }
}

export const connectionHandler = new ConnectionHandler()
