import { execSync } from 'node:child_process'
import { platform } from 'node:os'
import process from 'node:process'

const commands: string[] = []
const date = () => {
  const nowDate = new Date()
  return `${nowDate.getFullYear()}-${String(nowDate.getMonth() + 1).padStart(2, '0')}-${String(nowDate.getDate()).padStart(2, '0')} ${String(nowDate.getHours()).padStart(2, '0')}:${String(nowDate.getMinutes()).padStart(2, '0')}:${String(nowDate.getSeconds()).padStart(2, '0')}`
}
if (!process.env.TAG) {
  process.env.TAG = execSync('git describe --tags', { encoding: 'utf8' }).trim() || ''
}

execSync('electron-vite build && electron-builder --linux --publish=never', { stdio: 'inherit' })
