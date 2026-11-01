import { model, Schema } from "mongoose";

const productsSchema = new Schema(
    {
        id: {
            type: String,
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

        suppliers: {
            type: String,
            required: true,
        },

        stock: {
            type: Number,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        category: {
            type: String,
            required: true,
            enum:['Head',
                'Leg', 
                'Hand', 
                'Dental Care', 
                'Medicine', 
                'Skin Care',
            ],
        },
});
    
productsSchema.index({category: 1,});
export const Products = model('products', productsSchema);