const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DocumentSchema = new Schema(
  {
    content: { type: Schema.Types.Mixed, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Document", DocumentSchema);
