export const config = {
  app: {
    env: __ENV__,
    port: process.env.PORT || 8020,
    host: process.env.HOST,
    root: `${SYSTEM_PATH}/src`,
  },
  winston: {
    consoleLevel: 'debug',
    fileLevel: 'error',
    filename: 'ad-service.log',
  },
}
