import { Reviews } from "../models/reviews.js";

export const getCustomerReviews = async (req, res) => {
    const reviews = await Reviews.find();
    res.status(200).json(reviews);

};