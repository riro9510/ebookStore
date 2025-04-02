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
//const passport = require('passport');
//const session = require('express-session');
//const GitHubStrategy = require('passport-github2').Strategy;

app.use(cors())
app.use(express.json())
/*app.use(session({
  secret:"secret",
  resave: false,
  saveUninitialized:true,
}))
app.use(passport.initialize()).use(passport.session());*/
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
/*passport.use(new GitHubStrategy({
  clientID:process.env.GITHUB_CLIENT_ID,
  clientSecret:process.env.GITHUB_CLIENT_SECRET,
  callbackURL:process.env.CALLBACK_URL
},
function(accessToken,refreshToken,profile,done){
    return done(null,profile);
  
}
));

passport.serializeUser((user,done)=>{
  done(null,user);
})
passport.deserializeUser((user,done)=>{
  done(null,user);
})*/

app.use(express.static('public'))
app.use('/', require('./src/routes/index.js'))

app.listen(port)
console.log(`🚀Web server listening on port ${port}🚀`)
