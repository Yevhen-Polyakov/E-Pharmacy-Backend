import { model, Schema } from "mongoose";

const reviewsSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },

        avatar:{
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        testimonial: {
            type: String,
            required: true,
        }

    });

    export const Reviews = model('reviews', reviewsSchema);