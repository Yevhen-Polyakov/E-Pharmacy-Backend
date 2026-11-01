import {Joi, Segments } from 'celebrate';

export const registerUserSchema = {
    [Segments.BODY]: Joi.object({
        username: Joi.string().min(2).max(30).pattern(/^[a-zA-Z0-9 ]+$/).required().trim(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/).required(),
        phone: Joi.string().pattern(/^\+[1-9]\d{7,14}$/),
    }),
};

export const loginUserSchema = {
    [Segments.BODY]: Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required(),
    }),
};