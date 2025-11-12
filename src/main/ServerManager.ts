import {
  createServer,
  type IncomingMessage,
  type Server as HttpServer,
  type ServerResponse
} from 'node:http'
import { homedir } from 'node:os'

import RobotAlarmModel from '@db/RobotAlarmModel'
import { ZmqManager } from '@main/ZmqManager'
import { pedro } from '@models/index'
import cors from 'cors'
import express, { type Express } from 'express'
import { join } from 'path'
import { Sequelize } from 'sequelize'
import { Server as WebsocketServer } from 'socket.io'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: join(homedir(), '/pedro/pedro.db'),
  logging: false
})
const DB = {
  RobotAlarm: RobotAlarmModel(sequelize)
}
export interface ServerAccess {
  insertAlarm(msg: pedro.RobotAlarm): Promise<any>
  selectAlarm(): Promise<Uint8Array>
}

export class ServerManager implements ServerAccess {
  SERVER_PORT = 9417
  SERVER_URL: string
  RENDERER_PATH = join(__dirname, '../renderer')
  expressApp: Express = express()
  server: HttpServer<typeof IncomingMessage, typeof ServerResponse>
  zmqWss: WebsocketServer
  zmqManager: ZmqManager

  constructor() {
    this.SERVER_URL = `http://localhost:${this.SERVER_PORT}`
    this.server = createServer(this.expressApp)
    this.expressApp.use((req, res, next) => {
      if (req.method !== 'GET' && req.method !== 'OPTIONS') {
        return res.status(405).send('Method Not Allowed')
      }
      return next()
    })

    this.expressApp.use(
      cors({
        origin: '*',
        methods: ['GET', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
        exposedHeaders: ['Content-Disposition']
      })
    )

    this.expressApp.use('/', express.static(this.RENDERER_PATH))

    this.expressApp.get('/*splat', (_, res) => {
      res.sendFile(join(this.RENDERER_PATH, 'index.html'))
    })

    this.zmqWss = new WebsocketServer(this.server, {
      path: '/ws/zmq',
      transports: ['websocket'],
      cors: { origin: '*' }
    })
    this.zmqManager = new ZmqManager(this.zmqWss, this)

    this.server.listen(this.SERVER_PORT, '0.0.0.0')
  }

  async init(): Promise<boolean> {
    return new Promise((r) => {
      Promise.all([sequelize.authenticate(), sequelize.sync({ force: false, alter: true })])
        .then(() => {
          r(true)
        })
        .catch((e) => {
          console.error(e)
          r(false)
        })
    })
  }

  destroy() {
    this.zmqManager.destroy()
  }

  insertAlarm(msg: pedro.RobotAlarm) {
    return DB.RobotAlarm.create(msg)
  }

  async selectAlarm(): Promise<Uint8Array> {
    return pedro.RobotAlarmList.encode(
      new pedro.RobotAlarmList({
        list: (
          await DB.RobotAlarm.findAll({
            order: [['timestamp', 'DESC']],
            limit: 100
          })
        ).map((alarm) => pedro.RobotAlarm.fromObject(alarm))
      })
    ).finish()
  }
}
