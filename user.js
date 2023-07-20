const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");


mongoose.connect("mongodb://127.0.0.1:27017/userDB");


const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema);

module.exports = {
    User,
}