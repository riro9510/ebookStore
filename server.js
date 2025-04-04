/*===============================================
File: server.js
Author: Steven Thomas
Date: March 26, 2025
Purpose: Startup script for the project
===============================================*/
// ==============================================
// Section: Require statements
// ===============================================
const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000
const cors = require('cors');
const database = require('./src/database/index.js');
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");



app.use(cors())
app.use(express.json())
app.use(session({
  secret:process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


app.listen(port)
console.log(`🚀Web server listening on port ${port}🚀`)
