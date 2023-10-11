const mongoose = require('mongoose');
//const Joi = require("joi");

const productSchema = new mongoose.Schema({
    supproductid:{type:String, unique: true},
    productName: {type:String, required: true},
    productPrice: {type:Number, required: true},
    productDescription: {type: String, required: true}
})

productSchema.pre("save", async function (next) {
    try {
      let count = await this.constructor.countDocuments({});
      let id = `SP${(count + 1).toString().padStart(3, "0")}`;
      let duplicate = true;
  
      // Check if id already exists in the database
      while (duplicate) {
        const existingContact = await this.constructor.findOne({ supproductid: id });
        if (!existingContact) {
          duplicate = false;
        } else {
          count++;
          id = `SP${(count + 1).toString().padStart(3, "0")}`;
        }
      }
  
      this.supproductid = id;
      next();
    } catch (err) {
      next(err);
    }
  });

const supproducts = mongoose.model("supproducts", productSchema);

// const validateVehicle = (data) => {
//     const schema = Joi.object({
//         registerNo: Joi.string().min(4).max(9).required(),
//         chassisNo: Joi.string().min(4).max(30).required(),
//         manufactureYear: Joi.string().min(1).max(5).required()
//     })

//     return schema.validate(data);
// }

module.exports = supproducts