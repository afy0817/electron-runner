<script setup lang="ts">
import { useIpcStore } from '@renderer/store/ipc'
import { computed, onMounted } from 'vue'

const ipcStore = useIpcStore()
function getAlarm() {
  console.log(123)
}
const tag = computed(() => {
  // eslint-disable-next-line no-undef
  return __APP_TAG__
})
onMounted(() => {
  ipcStore.initialize()
})
</script>

<template>
  <div>
    <button @click="getAlarm">get</button>
    <div>{{ tag }}</div>
    <div v-for="(alarm, idx) in ipcStore.alarmList" :key="`alarm-${idx}`">
      {{ alarm.code }}
    </div>
  </div>
</template>
