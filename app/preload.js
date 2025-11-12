const { contextBridge } = require('electron')
contextBridge.exposeInMainWorld('env', { app: 'shopping-electron' })
