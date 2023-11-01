const { platform } = process

const Platform = {
  isMac: platform === "darwin",
  isWindows: platform === "win32",
  isLinux: platform === "linux",
}

export default Platform
