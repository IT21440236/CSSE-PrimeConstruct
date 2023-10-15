const mongoose = require("mongoose");
const Joi = require("joi");

const SiteSchema = new mongoose.Schema({
  siteid: {
    type: String,
    unique: true,
  },
  sitename: {
    type: String,
    required: [true, "Please add a site name"],
  },
  siteAddress: {
    type: String,
    required: [true, "Please add a site address"],
  },
  contactno: {
    type: Number,
    required: [true, "Please add a contact number"],
  },
  budget: {
    type: Number,
    required: [true, "Please add a budget"],
  },
  siteManager: {
    type: String,
    required: [true, "Please add a site manager"],
  },
  // add more fields as required
});

SiteSchema.pre("save", async function (next) {
  try {
    let count = await this.constructor.countDocuments({});
    let id = `SI${(count + 1).toString().padStart(3, "0")}`;
    let duplicate = true;

    // Check if id already exists in the database
    while (duplicate) {
      const existingSite = await this.constructor.findOne({ siteid: id });
      if (!existingSite) {
        duplicate = false;
      } else {
        count++;
        id = `SI${(count + 1).toString().padStart(3, "0")}`;
      }
    }

    this.siteid = id;
    next();
  } catch (err) {
    next(err);
  }
});

const Site = new mongoose.model("Site", SiteSchema);

const validateSite = (data) => {
  const schema = Joi.object({
    sitename: Joi.string().min(2).max(50).required(),
    siteAddress: Joi.string().min(4).max(100).required(),
    contactno: Joi.number().min(7).max(100000000000).required(),
    budget: Joi.number().required(),
    siteManager: Joi.string().min(2).max(50).required(),
    // add more fields validation as required
  });

  return schema.validate(data);
};

module.exports = {
  validateSite,
  Site,
};
