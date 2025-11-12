import { ServerManager } from '@main/ServerManager'
import { app, BrowserWindow, dialog, ipcMain, shell } from 'electron'
import { join } from 'path'

app.commandLine.appendSwitch('high-dpi-support', '1')
// window 생성
function windowHandle(serverUrl: string): BrowserWindow {
  const mainWindow = new BrowserWindow({
    title: 'Navifra HMI',
    show: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      partition: 'incognito-session'
    },
    kiosk: !import.meta.env.DEV,
    icon: join(__dirname, '../../resources/icon.png')
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (import.meta.env.DEV && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.setPosition(50, 50)
    mainWindow.setSize(1500, 600)
    mainWindow.webContents.openDevTools({ mode: 'right' })
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadURL(serverUrl)
  }
  return mainWindow
}
if (!app.requestSingleInstanceLock()) {
  // 이미 실행중
  app.whenReady().then(() => {
    dialog.showMessageBoxSync({
      type: 'warning', // info | warning | error | question | none
      buttons: ['확인'],
      defaultId: 0,
      title: '중복 실행 감지',
      message: '이미 앱이 실행 중입니다.',
      detail: '여러개의 앱을 동시에 실행 할 수 없습니다.',
      noLink: true // 버튼에 밑줄 제거
    })
    app.quit()
  })
} else {
  app.whenReady().then(async () => {
    // express 서버 실행
    const serverManager = new ServerManager()
    // 서비스에 필요한 디렉토리 생성
    serverManager.init().then((_res) => {
      // ipc handler 생성
      ipcMain.handle('app:close', () => {
        app.quit()
      })
      // window 생성
      let mainWindow: BrowserWindow = windowHandle(serverManager.SERVER_URL)
      app.on('before-quit', () => {
        serverManager.destroy()
      })

      // mac 에서 필요한 기능
      app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          mainWindow = windowHandle(serverManager.SERVER_URL)
        }
      })
    })
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
}
process.on('uncaughtException', (e) => {
  console.error('uncaughtException', e)
  app.quit()
})

// 2. unhandledRejection 처리
process.on('unhandledRejection', (e) => {
  console.error('unhandledRejection', e)
  app.quit()
})
