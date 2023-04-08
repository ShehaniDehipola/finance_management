const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const financeSchema = new Schema(
  {
    salesID: {
      type: String,
      required: true,
    },
    invoiceID: {
      type: Number,
      required: true,
    },
    dateAndTime: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    branchID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FinanceDetail", financeSchema);
