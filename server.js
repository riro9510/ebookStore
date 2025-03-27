/*===============================================
File: server.js
Author: Steven Thomas
Date: March 26, 2025
Purpose: Startup script for the project
===============================================*/
// ==============================================
// Section: Require statements
// ===============================================
const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 3000
const cors = require('cors')
const database = require('./src/database/index.js')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  )
  next()
})

// Allow the use of the static folder
app.use(express.static('public'))
app.use('/', require('./src/routes/index.js'))

app.listen(port)
console.log(`🚀Web server listening on port ${port}🚀`)
