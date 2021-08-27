const fs = require("fs");
const express = require("express");
const ejs = require("ejs");
const app = express();
const http = require('http')
const server = http.createServer(app)
const session = require('express-session');
const port = process.env.PORT || 3000;
const cookieParser = require("cookie-parser");
const Mongosession  = require('connect-mongodb-session')(session);
const storesession  = new Mongosession({
  uri: "mongodb+srv://Caxinha:CAXINHA@cluster0.ui8eg.mongodb.net/oAuth2?retryWrites=true&w=majority",
  collection: 'UserSession',
});

app.use(cookieParser());
app.enable('trust proxy');
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(require("path").join(__dirname, "/public")));
app.use(session({
  secret: "mongodb+srv://Caxinha:CAXINHA@cluster0.ui8eg.mongodb.net/oAuth2?retryWrites=true&w=majority",
  resave: true,
  saveUninitialized: false,
  store: storesession,
  cookie: {
    expires: 86400000,
  },
}));

const listener = server.listen(port, () => {
  console.log(`Site rodando na porta : ` + listener.address().port);
});

require('./Router.js')(app); 