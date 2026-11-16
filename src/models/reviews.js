import { model, Schema } from "mongoose";

const reviewsSchema = new Schema(
    {
        avatar:{
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        rating: {
            type: Number,
            required: true, 
        },

        testimonial: {
            type: String,
            required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true });

    export const Reviews = model('reviews', reviewsSchema);