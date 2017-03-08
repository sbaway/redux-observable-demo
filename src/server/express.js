import express from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import compression from 'compression'

import serverRender from './render'

const NODE_SERVER_PORT = 2333
const ONE_WEEK = 1000 * 60 * 60 * 24 * 7
const app = express()

app.use(compression())
app.use(cookieParser())
app.use(session({
  name: 'colorfulcow',
  secret: '@#$%^&*(kdfhifweurh)',
  cookie: { path: '/', maxAge: ONE_WEEK, httpOnly: true },
}))

app.use(serverRender)

const server = app.listen(NODE_SERVER_PORT, (err) => {
  if (err) logger.error(err)
  const { address: host, port } = server.address()
  logger.info(`node server is running at ${host}:${port}`)
})

app.use((err) => {
  if (err) logger.error(`error occoured on server, ${err.stack}`)
})
