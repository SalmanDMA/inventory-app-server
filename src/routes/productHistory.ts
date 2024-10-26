import { Router } from 'express';
import {
  createProductHistory,
  forceDeleteProductHistories,
  getProductHistories,
  getProductHistoryById,
  restoreProductHistories,
  softDeleteProductHistories,
  updateProductHistory,
} from '../controllers/productHistory';
import {
  validationCreateProductHistory,
  validationSendIds,
  validationUpdateProductHistory,
} from '../validation/productHistory';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', verifyAdmin, getProductHistories);
router.post('/', verifyAdmin, validationCreateProductHistory, createProductHistory);
router.put('/soft-delete', verifyAdmin, validationSendIds, softDeleteProductHistories);
router.put('/restore', verifyAdmin, validationSendIds, restoreProductHistories);
router.delete('/force-delete', verifyAdmin, validationSendIds, forceDeleteProductHistories);

router.get('/:id', getProductHistoryById);
router.put('/:id', verifyAdmin, validationUpdateProductHistory, updateProductHistory);

export default router;
