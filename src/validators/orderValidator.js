
const Joi = require("joi");
const createError = require("http-errors");

const orderSchema = Joi.object({
  userId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
      })
    )
    .required(),
  totalAmount: Joi.number().required(),
  status: Joi.string().valid("pending", "shipped", "delivered"),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

function validateOrder(req, res, next) {
  const { error } = orderSchema.validate(req.body);
  if (error) {
    return next(
      createError(400, `Validation Error: ${error.details[0].message}`)
    );
  }
  next();
}

module.exports = { validateOrder };