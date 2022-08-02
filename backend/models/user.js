const mongoose = require("mongoose");

const { Schema } = mongoose;
const autoIncrementModelID = require("./counterModel");
const userSchema = new Schema({
  id: Number,
  first: String,
  last: String,
  email: String,
  password: String,
  phone_number: String,
  mailing_address: String,
  billing_address: String,
  preferred_diner: String,
  payment: String,
});

userSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("_id", this, next);
});
module.exports = mongoose.model("users", userSchema);
