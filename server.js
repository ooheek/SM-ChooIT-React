const path = require('path')

const { createProxyMiddleware } = require('http-proxy-middleware')
const express = require('express')
const bodyParser = require('body-parser')
const buildDir = path.join(process.cwd() + '/build')

const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use(express.static(path.join(__dirname, 'build')))

app.use(
  createProxyMiddleware('/api', {
    target: 'http://15.165.169.129',
    changeOrigin: true,
  }),
)

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080)
