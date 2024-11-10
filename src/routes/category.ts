import { Router } from 'express';
import {
  createCategory,
  forceDeleteCategories,
  getCategoryById,
  getCategories,
  restoreCategories,
  softDeleteCategories,
  updateCategory,
} from '../controllers/category';
import { validationCreateCategory, validationSendIds, validationUpdateCategory } from '../validation/category';
import { authCheck} from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('category'));
router.get('/', getCategories);
router.post('/', validationCreateCategory, createCategory);
router.put('/soft-delete', validationSendIds, softDeleteCategories);
router.put('/restore', validationSendIds, restoreCategories);
router.delete('/force-delete', validationSendIds, forceDeleteCategories);
router.get('/:id', getCategoryById);
router.put('/:id', validationUpdateCategory, updateCategory);

export default router;
