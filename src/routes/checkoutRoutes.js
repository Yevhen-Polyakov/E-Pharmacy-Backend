import { Router } from "express";
import { authenticate } from "../middleware/authenticate.js";
import { celebrate } from "celebrate";
import { checkoutSchema } from "../validations/checkoutValidate.js";
import { checkout } from "../controllers/checkoutControllers.js";

const router = Router();

router.post('/api/cart/checkout', authenticate, celebrate(checkoutSchema), checkout);

export default router;