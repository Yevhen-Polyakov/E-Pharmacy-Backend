import { Router } from 'express';
import { getNearestMedicineStores, getStoresList } from '../controllers/pharmacies.js';

const router = Router();

router.get('/api/stores', getStoresList);
router.get('/api/stores/nearest', getNearestMedicineStores);

export default router;