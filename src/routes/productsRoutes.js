import { Router } from 'express';
import { getMedicines, getProductDetails } from '../controllers/productController.js';


const router = Router();

router.get('/api/products', getMedicines);
router.get('/api/products/:id', getProductDetails);

export default router;