import { Router } from 'express';
import { getMedicines, getProductDetails } from '../controllers/productController.js';
import { celebrate } from 'celebrate';
import { getProductsSchema } from '../validations/productsValidation.js';

const router = Router();

router.get('/api/products', celebrate(getProductsSchema), getMedicines);
router.get('/api/products/:id', getProductDetails);

export default router;