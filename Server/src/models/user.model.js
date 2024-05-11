const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { hashPassword } = require('../utils/auth');


const userSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  password: { type: String, required: true, minLength: 8, select: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
}, {
  timestamps: true,
});

userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.pre("save", async function(next) {
  if (this.isModified("password") || this.isNew) {
      this.password = await hashPassword(this.password);
  }
  next();
});

const User = mongoose.model("User", userSchema);



module.exports = User;



