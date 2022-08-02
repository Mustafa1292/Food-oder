const mongoose = require("mongoose");
const { Schema } = mongoose;

const table_aval = new Schema({
  id: Number,
  table_size_1: Number,
  table_size_2: Number,
  table_size_3: Number,
  table_size_4: Number,
  table_size_5: Number,
  table_size_6: Number,
  table_size_8: Number,
  date: Date,
});

module.exports = mongoose.model("tables", table_aval);
