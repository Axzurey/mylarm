const path = require("path")

const {app, BrowserWindow} = require("electron")
const isDev = require("electron-is-dev")
require("@electron/remote/main").initialize()

const port = 3000

function newWindow() {
    let window = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    })
    window.loadURL(isDev ? `http://localhost:${port}` : `file://${path.join(__dirname, '../build/index.html')}`)
}

app.on('ready', newWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) newWindow()
})