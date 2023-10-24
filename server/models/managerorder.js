const mongoose = require('mongoose');
//const Joi = require("joi");

const orderSchema = new mongoose.Schema({
    draftID: {type: String, required: true},
    orderid: {type: String, unique: true},
    siteName: {type: String, required: true},
    supplier: {type: String, required: true},
    placedDate: {type:Date, required: true},
    requiredDate: {type:Date, required: true},
    productName: {type:String, required: true},
    productQty: {type:Number, required: true},
    orderstatus: {type:String, required: true}
    // add more fields as required
})

orderSchema.pre("save", async function (next) {
    try {
      let count = await this.constructor.countDocuments({});
      let id = `PO${(count + 1).toString().padStart(3, "0")}`;
      let duplicate = true;
  
      // Check if id already exists in the database
      while (duplicate) {
        const existingContact = await this.constructor.findOne({ orderid: id });
        if (!existingContact) {
          duplicate = false;
        } else {
          count++;
          id = `PO${(count + 1).toString().padStart(3, "0")}`;
        }
      }
  
      this.orderid = id;
      next();
    } catch (err) {
      next(err);
    }
  });

const orders = mongoose.model("mngorders", orderSchema);

// const validateVehicle = (data) => {
//     const schema = Joi.object({
//         registerNo: Joi.string().min(4).max(9).required(),
//         chassisNo: Joi.string().min(4).max(30).required(),
//         manufactureYear: Joi.string().min(1).max(5).required()
//     })

//     return schema.validate(data);
// }

module.exports = orders