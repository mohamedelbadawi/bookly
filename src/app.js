const express = require("express");
const session = require("express-session");
const passport = require("passport");
// const bodyParser = require('body-parser');


require("dotenv").config();
// Initialize a express application
const app = express();
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
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
require("./config/passport")(passport);



// Start the app
const PORT = process.env.PORT;
app.use(require("./app/routes/routes"));
app.listen(PORT, console.log("server have been lift off 🚀"));