const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const configurationSchema = new Schema(
  {
    app_name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    push_token: {
      type: String,
    },
    enable_email: {
      type: Boolean,
      default: true,
    },
    sandbox: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Configuration", configurationSchema);
