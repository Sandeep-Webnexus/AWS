// import Joi from 'joi';
// import { Request, Response, NextFunction } from 'express';

// Define the product validation schema using Joi
// export const productValidationSchema = Joi.object({
//   name: Joi.string().min(3).max(255).required(),
//   description: Joi.string().min(10).max(1000).required(),
//   price: Joi.number().min(0).required(),
//   stock_quantity: Joi.number().integer().min(0).required(),
//   category_id: Joi.string().required(),
// });

// Joi validation middleware
// export const validateProduct = (req: Request, res: Response, next: NextFunction) => {
//   const { error } = productValidationSchema.validate(req.body);
//   if (error) {
//     return res.status(400).json({ error: error.details });
//   }
//   next(); // If validation is successful, continue to the next middleware/controller
// };

// --------------------------------------------------------------------------------------

import Joi from 'joi';

const productValidationSchema = Joi.object({
  name: Joi.string().min(3).max(255).required().messages({
    'string.base': 'Name must be a string.',
    'string.min': 'Name should have a minimum length of 3 characters.',
    'string.max': 'Name should have a maximum length of 255 characters.',
    'any.required': 'Name is required.',
  }),
  description: Joi.string().max(1000).optional().allow(null),
  price: Joi.number().precision(2).positive().required().messages({
    'number.base': 'Price must be a number.',
    'number.positive': 'Price must be a positive number.',
    'any.required': 'Price is required.',
  }),
  stock_quantity: Joi.number().integer().min(0).default(0).required().messages({
    'number.base': 'Stock quantity must be a number.',
    'number.integer': 'Stock quantity must be an integer.',
    'number.min': 'Stock quantity cannot be negative.',
    'any.required': 'Stock quantity is required.',
  }),
  category_id: Joi.number().integer().optional().allow(null),
  deleted_at: Joi.date().optional().allow(null),
});

export { productValidationSchema };

