export const logForDev =
  (fn) =>
  (...data) => {
    if (process.env.NODE_ENV !== 'production') {
      fn(...data)
    }
  }

export const consoleLogger = logForDev(console.log)
export const consoleWarn = logForDev(console.warn)
export const consoleError = logForDev(console.error)
export const consoleInfo = logForDev(console.info)
