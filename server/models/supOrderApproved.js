const mongoose = require('mongoose');
//const Joi = require("joi");

const suporderSchema = new mongoose.Schema({
    draftID: {type: String, required: true},
    orderid: {type: String, required: true},
    siteName: {type: String, required: true},
    supplier: {type: String, required: true},
    placedDate: {type:Date, required: true},
    requiredDate: {type:Date, required: true},
    productName: {type:String, required: true},
    productQty: {type:Number, required: true},
    orderstatus: {type:String, required: true},
    supstatus: {type:String, required: true},
    deliveryDate: {type:Date, required: true},
    supcomment: {type:String, required: true}
})

const suporders = mongoose.model("supacceptorders", suporderSchema);

// const validateVehicle = (data) => {
//     const schema = Joi.object({
//         registerNo: Joi.string().min(4).max(9).required(),
//         chassisNo: Joi.string().min(4).max(30).required(),
//         manufactureYear: Joi.string().min(1).max(5).required()
//     })

//     return schema.validate(data);
// }

module.exports = suporders