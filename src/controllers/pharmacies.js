import { NearbyPharmacies, Pharmacy } from "../models/pharmacies.js";

export const getStoresList = async (req, res) => {
    const pharmacies = await Pharmacy.find();
    res.status(200).json(pharmacies);
};

export const getNearestMedicineStores = async (req, res) => {
    const nearestPharmacies = await NearbyPharmacies.find();
    res.status(200).json(nearestPharmacies);
};