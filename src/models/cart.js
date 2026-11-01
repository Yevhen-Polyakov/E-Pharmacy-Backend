import { model, Schema } from "mongoose";

const cartItemSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'products',
        required: true,
    },

    photo: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true,
    },

    products: {
        type: String,
        required: true,
        default: '1'
    },

});

const cartSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
        unique: true,
    },

    items: {
        type: [cartItemSchema],
        default: [],
    },
});

export const Cart = model("carts", cartSchema);