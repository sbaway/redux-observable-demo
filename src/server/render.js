import request from 'superagent'
import fs from 'fs'
import path from 'path'

const webpackStatsPath = path.resolve(__dirname, './webpack-stats.json')
const HOST = process.env.HOST || 'localhost'
const WEBPACK_PORT = 8022
const webpackStats = fs.readFileSync(webpackStatsPath)
const webpackStatsObj = JSON.parse(webpackStats)

function generateJSRef() {
  let jsPath
  if (__IS_DEVELOPMENT__) {
    jsPath = `http://${HOST}:${WEBPACK_PORT}/${webpackStatsObj[0]}`
  } else {
    jsPath = `/dist/${webpackStats[0]}`
  }
  return `<script src="${jsPath}"></script>`
}
function generateCSSRef() {
  let cssPath
  if (__IS_DEVELOPMENT__) {
    cssPath = `http://${HOST}:${WEBPACK_PORT}/${webpackStatsObj[1]}`
  } else {
    cssPath = `/dist/${webpackStats[1]}`
  }
  return `<link href="${cssPath}" rel="stylesheet" type="text/css"/>`
}

export default function serverRender(req, res) {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
      ${generateCSSRef()}
    </head>
    <body>
      <div id="app"></div>
      ${generateJSRef()}
    </body>
    </html>
  `)
}
