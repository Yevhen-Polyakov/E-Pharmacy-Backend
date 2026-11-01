import { Schema, model } from "mongoose";

const userSchema = new Schema (
    {
       username: {
            type: String, 
            unique: true,
            required: true,
            trim: true,
       },

       email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
       },

       phone:{
            type: String,
            trim: true,
       },
       
       password: {
            type: String,
            required: true,
       },
    },
    { versionKey: false },
);

userSchema.methods.toJSON = function () {
     const obj = this.toObject();
     delete obj.password;
     return obj;
};

export const User = model('user', userSchema);
