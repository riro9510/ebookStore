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
const cors = require('cors');
const passport = require('./src/config/passport.js');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');

app.set('trust proxy', 1);

const allowedOrigins = {
  development: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://10.0.0.100:3000',
  ],
  production: ['https://ebookstore-s1o5.onrender.com'],
};

app.use(
  cors({
    origin: (origin, callback) => {
      const env = process.env.NODE_ENV || 'development';
      const isAllowed = !origin || allowedOrigins[env].includes(origin);
      return isAllowed
        ? callback(null, true)
        : callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SECRET || 'mysecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'lax',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// VIEW ENGINE / TEMPLATES
app.use(express.static('src/public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Allow the use of the static folder
app.use(express.static('public'));
app.use('/', require('./src/routes/index.js'));

app.use(require('./src/middleware/errorHandler.js').errorHandler);

module.exports = app;
