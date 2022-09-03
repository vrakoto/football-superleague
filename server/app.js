require('./db/testconnection').connect()
const express = require('express');
const app = express(),
      bodyParser = require("body-parser"),
      port = 4000,
      indexRouter = require('./routes/index'),
      session = require('express-session')

app.use(bodyParser.json());

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

/* app.use(function(req, res, next) {
    res.locals.auth = req.user;
}); */

// Routes
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});