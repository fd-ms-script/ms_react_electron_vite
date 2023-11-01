import { app, BrowserWindow } from "electron"
import { electronApp, optimizer } from "@electron-toolkit/utils"
import { createWindow } from "@main/windows/main/index"

app.whenReady().then(() => {
  // 设置 windows 应用的 user model id
  electronApp.setAppUserModelId("com.electron")

  // 在开发中默认通过 F12 打开或关闭 DevTools
  // 在生产环境中忽略 CommandOrControl + R
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on("activate", function () {
    // 在macOS上，通常会在应用程序中重新创建一个窗口
    // 单击dock图标，没有其他窗口打开。
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口都关闭时退出，除了macOS。在那里，应用程序和它们的菜单栏通常保持活动状态，直到用户使用Cmd + Q显式退出。
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
