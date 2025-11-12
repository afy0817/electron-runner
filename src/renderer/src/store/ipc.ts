import { WS_CHANNEL } from '@models/common'
import { pedro } from '@models/index'
import { SocketManager } from '@renderer/plugins/SocketManager'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface AlarmItem {
  timestamp: number
  date: string
  code: string
  description?: string
}
export const useIpcStore = defineStore('ipc', () => {
  let initialized = false
  const isRemote = computed(() => (window as any).electronAPI === undefined)

  // region websocket
  const wsMap: Map<WS_CHANNEL, SocketManager> = new Map()

  function req(channel: WS_CHANNEL, topic: string, data: any = {}): Promise<pedro.REP> {
    return (
      wsMap.get(channel)?.req(topic, data) ??
      new Promise((r) => r(pedro.REP.create({ result: 'fail' })))
    )
  }

  function sub(
    channel: WS_CHANNEL,
    topic: string,
    option: { data?: any; callback: CallableFunction }
  ): Promise<boolean> {
    return wsMap.get(channel)?.sub(topic, option) ?? new Promise((r) => r(false))
  }

  function unsub(channel: WS_CHANNEL, topic: string): Promise<boolean> {
    return wsMap.get(channel)?.unsub(topic) ?? new Promise((r) => r(false))
  }
  // endregion websocket

  // region heartbeat
  const updateTimestamps = ref<number[]>([])
  const connectionFactor = computed(() => {
    const count = updateTimestamps.value.length
    if (count >= 4) return { value: '3', class: 'text-success' }
    if (count === 3) return { value: '2', class: 'text-warning' }
    if (count === 2) return { value: '1', class: 'text-error' }
    return { value: 'outline', class: 'text-error' }
  })
  function heartbeatCallback() {
    updateTimestamps.value.push(Date.now())
    if (updateTimestamps.value.length > 10) {
      updateTimestamps.value.shift()
    }
  }
  function heartbeatInterval() {
    setInterval(() => updateTimestamps.value.shift(), 1000)
  }
  // endregion heartbeat

  // region alarm
  function formatDate(timestamp: number) {
    const date = new Date(timestamp)
    const yyyy = date.getFullYear()
    const MM = String(date.getMonth() + 1).padStart(2, '0') // 월(0~11)
    const DD = String(date.getDate()).padStart(2, '0')
    const hh = String(date.getHours()).padStart(2, '0')
    const mm = String(date.getMinutes()).padStart(2, '0')
    const ss = String(date.getSeconds()).padStart(2, '0')
    const sss = String(date.getMilliseconds()).padStart(3, '0')

    return `${yyyy}-${MM}-${DD} ${hh}:${mm}:${ss}.${sss}`
  }
  const _alarmList = ref<AlarmItem[]>([])
  const alarmList = computed(() => _alarmList.value.sort((a, b) => b.timestamp - a.timestamp))
  function updateAlarmList(data: pedro.RobotAlarmList) {
    console.log(data)
    if (data.list) {
      _alarmList.value = data.list.map((item: pedro.IRobotAlarm) => {
        return {
          timestamp: item.timestamp!,
          date: formatDate(item.timestamp!),
          code: item.code!,
          description: item.description ?? undefined
        }
      })
    } else {
      _alarmList.value = []
    }
  }
  // endregion alarm

  function closeApp() {
    if (isRemote.value) {
      window.close()
    } else {
      ;(window as any).electronAPI.close()
    }
  }

  function setScale(value: number) {
    if (!isRemote.value) {
      ;(window as any).electronAPI.setScale(value)
    }
  }

  async function initialize(): Promise<boolean> {
    if (initialized) return Promise.resolve(true)
    wsMap.set(
      WS_CHANNEL.ZMQ,
      new SocketManager({
        path: '/ws/zmq',
        initSubscribe: {
          robot_heartbeat: { callback: heartbeatCallback },
          robot_alarm: { callback: updateAlarmList }
        }
      })
    )
    heartbeatInterval()

    initialized = true
    return Promise.resolve(true)
  }

  return {
    initialize,
    req,
    sub,
    unsub,
    connectionFactor,
    closeApp,
    isRemote,
    setScale,
    alarmList
  }
})
