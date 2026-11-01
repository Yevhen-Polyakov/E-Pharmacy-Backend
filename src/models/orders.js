
import { model, Schema } from "mongoose";

const orderSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },

        productId: {
            type: Schema.Types.ObjectId,
            ref: "products",
            required: true,
        },

        photo: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
            trim: true,
        },

        phone:{
            type: String,
            required: true,
            trim: true,
        },

        address: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            
        },

        products: {
            type: String,
            required: true,
        },

        price: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Completed",
                "Confirmed",
                "Cancelled",
                "Shipped",
                "Delivered",
            ],
            default: "Pending",
        },

        order_date: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false }
);

export const Order = model("orders", orderSchema);
