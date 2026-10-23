import createHttpError from 'http-errors';
import { Products } from '../models/products.js';

export const getMedicines = async (req, res) => {
  const products = await Products.find();
  res.status(200).json(products);
};

export const getProductDetails = async (req,res) => {
  const {productId} = req.params;
  const product = await Products.findById(productId);

  if(!product) {
    throw new createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);

};