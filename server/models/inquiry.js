const mongoose = require('mongoose');
//const Joi = require("joi");

const inquirySchema = new mongoose.Schema({
    supplierName: {type:String, required: true},
    supplierEmail: {type:String, required: true},
    Description: {type: String, required: true}
})

const inquiry = mongoose.model("inquiry", inquirySchema);

// const validateVehicle = (data) => {
//     const schema = Joi.object({
//         registerNo: Joi.string().min(4).max(9).required(),
//         chassisNo: Joi.string().min(4).max(30).required(),
//         manufactureYear: Joi.string().min(1).max(5).required()
//     })

//     return schema.validate(data);
// }

module.exports = inquiry