require('./db/testconnection').connect()
const express = require('express');
const app = express(),
      bodyParser = require("body-parser"),
      cors = require('cors'),
      port = 4000,
      clubRouter = require('./routes/club'),
      joueurRouter = require('./routes/joueur'),
      paysRouter = require('./routes/pays'),
      positionRouter = require('./routes/position'),
      session = require('express-session')

app.use(bodyParser.json());

// app.use(cors())

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
}));

/* app.use(function(req, res, next) {
    res.locals.auth = req.user;
}); */

// Route club
app.use('/club/', cors(), clubRouter);

// Route joueur
app.use('/joueur/', cors(), joueurRouter);

// Route pays
app.use('/pays/', cors(), paysRouter);

// Route position
app.use('/position/', cors(), positionRouter);


app.listen(port, () => {
    console.log(`Server listening on the port:${port}`);
});