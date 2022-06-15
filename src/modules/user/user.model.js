import mongoose from "mongoose";
import argon2 from "argon2";
import { compareSync } from "bcrypt";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    // required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

userSchema.methods.comparePassword = async function (password) {
  return compareSync(this.password, password);
  return argon2.verify(this.password, password);
};

module.exports = mongoose.model("User", userSchema);
