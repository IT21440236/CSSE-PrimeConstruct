const mongoose = require('mongoose');
//const Joi = require("joi");

const lgdeliverySchema = new mongoose.Schema({
    deliveryID: {type: String, unique: true},
    draftID: {type: String, required: true},
    orderid: {type: String, required: true},
    siteName: {type: String, required: true},
    supplier: {type: String, required: true},
    deliveryDate: {type:Date, required: true},
    productName: {type:String, required: true},
    productQty: {type:Number, required: true},
    comment: {type:String, required: true}
})

lgdeliverySchema.pre("save", async function (next) {
    try {
      let count = await this.constructor.countDocuments({});
      let id = `DO${(count + 1).toString().padStart(3, "0")}`;
      let duplicate = true;
  
      // Check if id already exists in the database
      while (duplicate) {
        const existingContact = await this.constructor.findOne({ orderid: id });
        if (!existingContact) {
          duplicate = false;
        } else {
          count++;
          id = `DO${(count + 1).toString().padStart(3, "0")}`;
        }
      }
  
      this.deliveryID = id;
      next();
    } catch (err) {
      next(err);
    }
  });

const lgdelivery = mongoose.model("lgdelivery", lgdeliverySchema);

// const validateVehicle = (data) => {
//     const schema = Joi.object({
//         registerNo: Joi.string().min(4).max(9).required(),
//         chassisNo: Joi.string().min(4).max(30).required(),
//         manufactureYear: Joi.string().min(1).max(5).required()
//     })

//     return schema.validate(data);
// }

module.exports = lgdelivery