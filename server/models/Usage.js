const mongoose = require("mongoose");

const usageSchema = mongoose.Schema({
  isUsage: {
    type: Boolean,
    required: true,
    default: false
  }
});

const Usage = mongoose.model("Usage", usageSchema);
module.exports = { Usage };
