const { app, BrowserWindow, desktopCapturer, ipcMain, session, shell } = require('electron');
const path = require('path');

// Captura e encode o mais rápido possível: GPU potente, sem limite de fps, captura WGC nativa
app.commandLine.appendSwitch('force_high_performance_gpu');
app.commandLine.appendSwitch('ignore-gpu-blocklist');
app.commandLine.appendSwitch('disable-frame-rate-limit');
app.commandLine.appendSwitch('disable-gpu-vsync');
app.commandLine.appendSwitch('enable-gpu-rasterization');
app.commandLine.appendSwitch('enable-zero-copy');
app.commandLine.appendSwitch('enable-features', 'AllowWgcScreenCapturer,AllowWgcWindowCapturer,AllowWgcZeroHz,WebRtcHWH264Encoding');
app.commandLine.appendSwitch('disable-renderer-backgrounding');
app.commandLine.appendSwitch('disable-background-timer-throttling');
app.commandLine.appendSwitch('disable-backgrounding-occluded-windows');

let pending = null;

ipcMain.handle('sinal:sources', async () => {
  const list = await desktopCapturer.getSources({ types: ['screen', 'window'], thumbnailSize: { width: 400, height: 225 }, fetchWindowIcons: false });
  return list.map(s => ({ id: s.id, name: s.name, thumb: s.thumbnail.toDataURL() }));
});
ipcMain.handle('sinal:pick', (_e, id) => { pending = id; });

app.whenReady().then(() => {
  session.defaultSession.setDisplayMediaRequestHandler(async (req, cb) => {
    const list = await desktopCapturer.getSources({ types: ['screen', 'window'] });
    const src = list.find(s => s.id === pending) || list[0];
    cb(req.audioRequested ? { video: src, audio: 'loopback' } : { video: src });
  });
  session.defaultSession.setPermissionRequestHandler((_wc, _perm, cb) => cb(true));

  const win = new BrowserWindow({
    width: 1280, height: 800, backgroundColor: '#0b0b0c', autoHideMenuBar: true, title: 'SINAL',
    webPreferences: { preload: path.join(__dirname, 'preload.js'), contextIsolation: true, backgroundThrottling: false }
  });
  win.loadFile('index.html');
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
});
app.on('window-all-closed', () => app.quit());
