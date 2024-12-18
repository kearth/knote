const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');

let backendProcess;

app.on('ready', () => {
  // 启动后端服务
  backendProcess = exec('go run backend/main.go 8080', (err, stdout, stderr) => {
    if (err) {
      console.error(`Error starting backend: ${err.message}`);
    }
    console.log(stdout);
    console.error(stderr);
  });

  // 创建窗口
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // 加载前端页面
  win.loadURL('http://localhost:5173');

  // 窗口关闭时清理后端进程
  win.on('closed', () => {
    if (backendProcess) backendProcess.kill();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});