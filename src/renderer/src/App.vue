<script setup lang="ts">
import { useIpcStore } from '@renderer/store/ipc'
import { onMounted } from 'vue'

const ipcStore = useIpcStore()
function getAlarm() {
  console.log(123)
}
onMounted(() => {
  ipcStore.initialize()
})
</script>

<template>
  <div>
    <button @click="getAlarm">get</button>
    <div v-for="(alarm, idx) in ipcStore.alarmList" :key="`alarm-${idx}`">
      {{ alarm.code }}
    </div>
  </div>
</template>
