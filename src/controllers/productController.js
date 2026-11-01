import createHttpError from 'http-errors';
import { Products } from '../models/products.js';

export const getMedicines = async (req, res) => {

  const { page = 1, perPage = 12, category, search} = req.query;

  const skip = (page - 1) * perPage;

  const productsQuery = Products.find();

  if(search){
    productsQuery.where({name:{$regex: search, $options: 'i'},
    });
  }

  if(category) {
    productsQuery.where('category').equals(category);
  }

  const [totalItems, products] = await Promise.all([
    productsQuery.clone().countDocuments(),
    productsQuery.skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  res.status(200).json({
    page,
    perPage,
    totalItems,
    totalPages,
    products,
  });
};

export const getProductDetails = async (req,res) => {
  const { productId } = req.params;
  const product = await Products.findById(productId);

  if(!product) {
    throw new createHttpError(404, 'Product not found');
  }

  res.status(200).json(product);

};