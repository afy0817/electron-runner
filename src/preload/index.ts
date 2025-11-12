import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  close: () => ipcRenderer.invoke('app:close')
})
