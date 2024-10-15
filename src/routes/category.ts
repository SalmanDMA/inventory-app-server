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
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck, verifyAdmin);
router.get('/', getCategories);
router.post('/', validationCreateCategory, createCategory);
router.put('/soft-delete', validationSendIds, softDeleteCategories);
router.put('/restore', validationSendIds, restoreCategories);
router.delete('/force-delete', validationSendIds, forceDeleteCategories);
router.get('/:id', getCategoryById);
router.put('/:id', validationUpdateCategory, updateCategory);

export default router;
