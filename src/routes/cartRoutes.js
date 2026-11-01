import { Router } from "express";
import { addProduct, deleteProduct, getCartItems, updateCart } from "../controllers/cartControllers.js";
import { celebrate } from "celebrate";
import { cartProductIdSchema, cartSchema, updateCartSchema } from "../validations/cartValidate.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.get('/api/cart', authenticate, getCartItems);

router.post('/api/cart/addProduct', authenticate, celebrate(cartSchema), addProduct);
router.delete('/api/cart/:orderProductId', authenticate, celebrate(cartProductIdSchema), deleteProduct);
router.put('/api/cart/update', authenticate, celebrate(updateCartSchema), updateCart);

export default router;