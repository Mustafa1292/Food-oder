var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

counterSchema.index({ _id: 1, seq: 100 }, { unique: true });

const counterModel = mongoose.model("counter", counterSchema);

const autoIncrementModelID = function (modelName, doc, next) {
  counterModel.findByIdAndUpdate(
    modelName, // The ID to find for in counters model
    { $inc: { seq: 100 } }, // The update
    { new: true, upsert: true }, // The options
    function (error, counter) {
      if (error) return next(error);
      doc.id = counter.seq;
      next();
    }
  );
};

module.exports = autoIncrementModelID;
