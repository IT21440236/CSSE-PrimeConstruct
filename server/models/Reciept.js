const mongoose = require("mongoose");
const Joi = require("joi");

const ReceiptSchema = new mongoose.Schema({
  orderno: {
    type: String,
    unique: true,
  },
  productname: {
    type: String,
    required: [true, "Please add the product name"],
  },
  productQuantity: {
    type: Number,
    required: [true, "Please add the product quantity"],
  },
  deliveryDate: {
    type: Date,
    required: [true, "Please add the delivery date"],
  },
  // add more fields as required
});

ReceiptSchema.pre("save", async function (next) {
  try {
    let count = await this.constructor.countDocuments({});
    let id = `RE${(count + 1).toString().padStart(3, "0")}`;
    let duplicate = true;

    // Check if id already exists in the database
    while (duplicate) {
      const existingReceipt = await this.constructor.findOne({ orderno: id });
      if (!existingReceipt) {
        duplicate = false;
      } else {
        count++;
        id = `RE${(count + 1).toString().padStart(3, "0")}`;
      }
    }

    this.orderno = id;
    next();
  } catch (err) {
    next(err);
  }
});

const Receipt = new mongoose.model("Receipt", ReceiptSchema);

const validateReceipt = (data) => {
  const schema = Joi.object({
    orderno: Joi.number().required(),
    productname: Joi.string().min(2).max(50).required(),
    productQuantity: Joi.number().required(),
    deliveryDate: Joi.date().required(),
    // add more fields validation as required
  });

  return schema.validate(data);
};

module.exports = {
  validateReceipt,
  Receipt,
};
