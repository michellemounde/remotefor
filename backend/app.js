const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const { doubleCsrf } = require('csrf-csrf');

const { environment } = require('./config');
const isProduction = environment ==='production';

const { ValidationError } = require('sequelize');

const routes = require('./routes');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

/* This is the default CSRF protection middleware. */
const { doubleCsrfProtection } =
  doubleCsrf({
    // The only required option is getSecret, the rest have sensible defaults (shown below) other than cookieOptions edited as per AAO
    getSecret: (req) => req.secret,
    cookieName: isProduction && '__Host-remote-all.X-CSRF-Token' || 'Remote-All.X-CSRF-Token', // The name of the cookie to be used, recommend using `__Host-` prefix.
    cookieOptions: {
      httpOnly: true,
      sameSite: isProduction && 'Strict', // Recommend you make this strict if possible
      secure: isProduction,
      path: "/"
    },
    size: 64, // The size of the generated tokens in bits
    ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
    getTokenFromRequest: (req) => req.headers['x-csrf-token'] // A function that returns the token from the request
  });


// Security middleware
if (!isProduction) {
  // enable cors only in development
  app.use(cors());
}

  // helmet helps set a variety of headers to better secure your app
if (!isProduction) {
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: 'cross-origin'
    })
  );
} else {
  app.use(helmet())
}


  // Set the _csrf token and create req.csrfToken method;
app.use(doubleCsrfProtection);


// Connect routes
app.use(routes);

// Catch unhandled requests and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error("The requested resource couldn't be found.");
  err.title = "Resource Not Found";
  err.errors = { message: "The requested resource couldn't be found"};
  err.status = 404;
  next(err);
});

// Process sequelize errors
app.use((err, _req, _res, next) => {
  // check if error is a Sequelize error:
  if (err instanceof ValidationError) {
    let errors = {};
    for (let error of err.errors) {
      errors[error.path] = error.message;
    }
    err.title = 'Validation error';
    err.errors = errors;
  }
  next(err);
})

// Error formatter
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    title: err.title || 'Server Error',
    message: err.message,
    errors: err.errors,
    stack: isProduction ? null : err.stack
  });
})

module.exports = app;
