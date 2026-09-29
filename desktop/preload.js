const { contextBridge, ipcRenderer } = require('electron');
contextBridge.exposeInMainWorld('sinalNative', {
  sources: () => ipcRenderer.invoke('sinal:sources'),
  pick: id => ipcRenderer.invoke('sinal:pick', id)
});
