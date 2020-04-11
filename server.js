const express = require('express')
const server = express()

const db = require('./db')

server.use(express.static("public"))

server.listen(3000)