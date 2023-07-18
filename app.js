//jshint esversion:6
require("dotenv").config();
const express = require("express");
const bodyParser= require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

const app = express();
//------------------------

mongoose.connect("mongodb://127.0.0.1:27017/userDB");
const userSchema = new mongoose.Schema ({
  email:String,
  password: String
});

const secret = process.env.SECRET;
userSchema.plugin(encrypt, {secret:secret, encryptedFields: ['password']});

const User = mongoose.model("User", userSchema);


//-------------------------------------------------
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));

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

app.post("/register", function (req, res) {

   user = new User({email:req.body.username, password:req.body.password});
   user.save().then( () => res.render("secrets")
   );

});

app.post("/login", function (req, res) {

   User.findOne({email:req.body.username}).then( (data) => {

     if (data) {
                       if (data.password === req.body.password) {
                         res.render("secrets");
                       } else {
                         res.redirect("/login");
                       }
                }
   });

});



// -----------------------------------------------------------
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
