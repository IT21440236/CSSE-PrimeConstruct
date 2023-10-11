const mongoose = require('mongoose');
const joi = require('joi');

const categorySchema = mongoose.Schema({
  catid: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantityavailable: {
    type: Number,
    required: true,
  },

  quantitysold: {
    type: Number,
    required: true,
  },

  ordersinqueue: {
    type: Number,
    required: true,
  },
});

categorySchema.pre('save', async function (next) {
  try {
    if (!this.orderId) {
      let count = await this.constructor.countDocuments({});
      let id = `CAT${(count + 1).toString().padStart(3, '0')}`;
      let duplicate = true;

      //Check if id already exists in the database
      while (duplicate) {
        const existingCategory = await this.constructor.findOne({ catid: id });
        if (!existingCategory) {
          duplicate = false;
        } else {
          count++;
          id = `CAT${(count + 1).toString().padStart(3, '0')}`;
        }
      }

      this.catid = id;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const validateCategory = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    quantityavailable: Joi.number().required(),
    quantitysold: Joi.number().required(),
    ordersinqueue: Joi.number().required(),
  });

  return schema.validate(data);
};

const Category = mongoose.model('CategoryModel', categorySchema);
(module.exports = Category), validateCategory;
