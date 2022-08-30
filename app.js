const express = require("express");
const session = require("express-session");
const passport = require("passport");
var expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');

require("dotenv").config();
// Initialize a express application
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts)
app.set('view engine', 'ejs');
app.set("layout login", false);
// app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ extended: true }));
app.use(express.json());
// initialize session
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,

}));
app.use(passport.initialize());

app.use(passport.session());
// Initialize passport
require("./src/config/passport")(passport);


// Start the app
const PORT = process.env.PORT;

app.use(require("./src/app/routes/routes"));
app.use(express.static(__dirname + '/public'));
app.listen(PORT, console.log("server have been lift off 🚀"));