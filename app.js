//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");



const session = require("express-session");
const passport = require("passport");
const passport2 = require("./passport2.js");

const app = express();

//-------------------------------------------------
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));


app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//------------------------
const User = require("./user").User;         // importing user model
passport2.PSD();                              // importing passport configuration

// ------------------------------------------------------

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.get("/secrets", function (req, res) {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.redirect("/");
  }
});


// Define the registration route
app.post("/register",(req, res) => {
  const { username, password } = req.body;

  // Create a new user
  User.register(new User({ username }), password, (err) => {
    if (err) {
      console.error(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/secrets");
      });
    }});
  });

app.post("/login", passport.authenticate("local", {failureRedirect: "/login"}), (req, res) => {
  res.redirect("/secrets");
  console.log("sent to secrets page" + req);
});


// -----------------------------------------------------------
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
