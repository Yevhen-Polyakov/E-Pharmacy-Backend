import { model, Schema } from "mongoose";

const pharmacySchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },

  city: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },

  status:{
    type: String,
    enum:['open','close'],
  }
});

export const Pharmacy = model('pharmacies', pharmacySchema);
export const NearbyPharmacies = model('nearest_pharmacies', pharmacySchema);