const mongoose = require("mongoose");
const { Schema } = mongoose;
const autoIncrementModelID = require("../models/counterModel");

const reservedSchema = new Schema({
  id: Number,
  client: {
    name: String,
    email: String,
    phone_number: String,
    credit_card: String,
    billing_address: String,
  },
  date: { type: Date, default: Date.now },
  tables: Array,
  res_cost: Number,
  date_resv: Date,
});

reservedSchema.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("_id", this, next);
});
module.exports = mongoose.model("reserveds", reservedSchema);

// {
//   reservation_id: nextId(),
//   client: {
//     name: "viet",
//     email: "vietnguyencong99@gmail.com",
//     phone_number: "281-617-8339",
//     credit_card: "1234-567-789",
//     billing_address: "10918 renwick street, Houston, TX"
//   },
//   date: now(),
//    combined or not
//   tables: [table 1, table 2, table 3, table 4 ]
// }
