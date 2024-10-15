import { Router } from 'express';
import {
  createBrand,
  forceDeleteBrands,
  getBrandById,
  getBrands,
  restoreBrands,
  softDeleteBrands,
  updateBrand,
} from '../controllers/brand';
import { validationCreateBrand, validationSendIds, validationUpdateBrand } from '../validation/brand';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', verifyAdmin, getBrands);
router.post('/', verifyAdmin, validationCreateBrand, createBrand);
router.put('/soft-delete', verifyAdmin, validationSendIds, softDeleteBrands);
router.put('/restore', verifyAdmin, validationSendIds, restoreBrands);
router.delete('/force-delete', verifyAdmin, validationSendIds, forceDeleteBrands);

router.get('/:id', getBrandById);
router.put('/:id', verifyAdmin, validationUpdateBrand, updateBrand);

export default router;
