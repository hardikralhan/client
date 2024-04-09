const mongoose  = require("mongoose");

// Users Schema Starts From Here
const UserSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    dropDups: true
  },
  password: String,
}, { timestamps: true });

const User = mongoose.model('users', UserSchema)

module.exports = User;