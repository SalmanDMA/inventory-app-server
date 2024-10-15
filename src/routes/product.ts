import { Router } from 'express';
import {
  createProduct,
  forceDeleteProducts,
  getProductById,
  getProducts,
  restoreProducts,
  softDeleteProducts,
  updateProduct,
} from '../controllers/product';
import { validationCreateProduct, validationSendIds, validationUpdateProduct } from '../validation/product';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', verifyAdmin, getProducts);
router.post('/', verifyAdmin, validationCreateProduct, createProduct);
router.put('/soft-delete', verifyAdmin, validationSendIds, softDeleteProducts);
router.put('/restore', verifyAdmin, validationSendIds, restoreProducts);
router.delete('/force-delete', verifyAdmin, validationSendIds, forceDeleteProducts);

router.get('/:id', getProductById);
router.put('/:id', verifyAdmin, validationUpdateProduct, updateProduct);

export default router;
