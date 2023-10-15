const mongoose = require("mongoose");
const Joi = require("joi");

const InvoiceSchema = new mongoose.Schema({
  orderno: {
    type: String,
    unique: true,
  },
  bank: {
    type: String,
    required: [true, "Please add the bank name"],
  },
  branch: {
    type: String,
    required: [true, "Please add the branch name"],
  },
  accountno: {
    type: Number,
    required: [true, "Please add the account number"],
  },
  amount: {
    type: Number,
    required: [true, "Please add the amount"],
  },
  depositdate: {
    type: Date,
    required: [true, "Please add the deposit date"],
  },
  // add more fields as required
});

InvoiceSchema.pre("save", async function (next) {
  try {
    let count = await this.constructor.countDocuments({});
    let id = `IN${(count + 1).toString().padStart(3, "0")}`;
    let duplicate = true;

    // Check if id already exists in the database
    while (duplicate) {
      const existingInvoice = await this.constructor.findOne({ orderno: id });
      if (!existingInvoice) {
        duplicate = false;
      } else {
        count++;
        id = `IN${(count + 1).toString().padStart(3, "0")}`;
      }
    }

    this.orderno = id;
    next();
  } catch (err) {
    next(err);
  }
});

const Invoice = new mongoose.model("Invoice", InvoiceSchema);

const validateInvoice = (data) => {
  const schema = Joi.object({
    orderno: Joi.number().required(),
    bank: Joi.string().min(2).max(50).required(),
    branch: Joi.string().min(2).max(50).required(),
    accountno: Joi.number().min(7).max(100000000000).required(),
    amount: Joi.number().required(),
    depositdate: Joi.date().required(),
    // add more fields validation as required
  });

  return schema.validate(data);
};

module.exports = {
  validateInvoice,
  Invoice,
};
