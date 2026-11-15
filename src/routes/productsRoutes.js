import { Router } from 'express';
import { getMedicines, getProductDetails } from '../controllers/productController.js';
import { celebrate } from 'celebrate';
import { getProductsSchema } from '../validations/productsValidation.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get('/api/products', authenticate,  celebrate(getProductsSchema), getMedicines);
router.get('/api/products/:id', authenticate, getProductDetails);

export default router;