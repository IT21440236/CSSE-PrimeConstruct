const mongoose = require("mongoose");
//const Joi = require("joi");

const draftSchema = new mongoose.Schema({
  draftid: { type: String, unique: true },
  placedDate: { type: Date, required: true },
  requiredDate: { type: Date, required: true },
  supplier: { type: String, required: true },
  draftStatus: { type: String, required: true },
});

draftSchema.pre("save", async function (next) {
  try {
    let count = await this.constructor.countDocuments({});
    let id = `DO${(count + 1).toString().padStart(3, "0")}`;
    let duplicate = true;

    // Check if id already exists in the database
    while (duplicate) {
      const existingContact = await this.constructor.findOne({ draftid: id });
      if (!existingContact) {
        duplicate = false;
      } else {
        count++;
        id = `DO${(count + 1).toString().padStart(3, "0")}`;
      }
    }

    this.draftid = id;
    next();
  } catch (err) {
    next(err);
  }
});

const drafts = mongoose.model("drafts", draftSchema);

// const validateVehicle = (data) => {
//     const schema = Joi.object({
//         registerNo: Joi.string().min(4).max(9).required(),
//         chassisNo: Joi.string().min(4).max(30).required(),
//         manufactureYear: Joi.string().min(1).max(5).required()
//     })

//     return schema.validate(data);
// }

module.exports = drafts;
