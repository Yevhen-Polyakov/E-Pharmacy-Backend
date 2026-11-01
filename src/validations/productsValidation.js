import { Joi, Segments } from "celebrate";

export const getProductsSchema = {
    [Segments.QUERY]: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        perPage: Joi.number().integer().min(5).max(12).default(12),
        category: Joi.string().valid(
            'Head',
            'Leg', 
            'Hand', 
            'Dental Care', 
            'Medicine', 
            'Skin Care',
        ),
        search: Joi.string().trim().allow(""),
    }),
};