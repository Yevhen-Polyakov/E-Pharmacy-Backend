import { Joi, Segments } from "celebrate";

export const checkoutSchema = {
    [Segments.BODY]: Joi.object({
        name: Joi.string().trim().min(2).max(100).required(),
        address: Joi.string().trim().min(5).max(200).required(),
        phone: Joi.string()
        .trim()
        .pattern(/^\+?[0-9\s()-]{7,20}$/)
        .required(),
        email: Joi.string().trim().email().required().lowercase(),
    }),
};