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
const session = require('express-session');
const app = express();
require('dotenv').config();
require('dotenv').config();
const port = process.env.PORT || 3000
const cors = require('cors');
const database = require('./src/database/index.js');
const passport = require("./src/config/passport.js");
const authRoutes = require("./src/routes/authRoutes.js");
const userRoutes = require("./src/routes/users.js");
const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');




app.use(cors({
  /*origin:'https://ebookstore-s1o5.onrender.com/', // Remove for "production"
    credentials:true
  */}
))
app.use(express.json())
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());
app.use(session({
  secret: process.env.SECRET || 'mysecretkey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    sameSite: 'None',  
  }
}));
app.use(passport.initialize());
app.use(passport.session());

// VIEW ENGINE / TEMPLATES
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Allow the use of the static folder
app.use(express.static('public'));
app.use('/', require('./src/routes/index.js'));

app.use(require('./src/middleware/errorHandler.js').errorHandler);

app.listen(port);
console.log(`🚀Web server listening on port ${port}🚀`);
