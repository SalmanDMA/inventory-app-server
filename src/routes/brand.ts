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
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';


const router = Router();

router.use(authCheck, checkModuleAccess('brand'));
router.get('/', getBrands);
router.post('/', validationCreateBrand, createBrand);
router.put('/soft-delete', validationSendIds, softDeleteBrands);
router.put('/restore', validationSendIds, restoreBrands);
router.delete('/force-delete', validationSendIds, forceDeleteBrands);

router.get('/:id', getBrandById);
router.put('/:id', validationUpdateBrand, updateBrand);

export default router;
