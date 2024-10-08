import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/product';
import { authCheck } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', getProducts);
router.post('/', createProduct);

export default router;
