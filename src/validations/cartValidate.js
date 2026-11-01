import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";


const objectIdValidator = (value, helpers)=> {
    return !isValidObjectId(value) ? helpers.message('Invalid id format') : value; 
};

export const cartSchema = {
    [Segments.BODY]: Joi.object({
        productId: Joi.string().custom(objectIdValidator).required(),
        products: Joi.string().pattern(/^[1-9]\d*$/).required(), 
    })
};

export const cartProductIdSchema = {
    [Segments.PARAMS]: Joi.object({
        orderProductId: Joi.string().custom(objectIdValidator).required(),
    }),
};

export const updateCartSchema = {
    [Segments.BODY]: Joi.object({
        orderProductId: Joi.string().custom(objectIdValidator).required(),
        products: Joi.string().pattern(/^[1-9]\d*$/).required(),
    }),
};