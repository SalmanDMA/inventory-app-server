import { Router } from 'express';
import {
	createProductHistory,
	forceDeleteProductHistories,
	getProductHistories,
	getProductHistoriesByProductId,
	getProductHistoryById,
	getUniqueProductHistories,
	restoreProductHistories,
	softDeleteProductHistories,
	updateProductHistory,
} from '../controllers/productHistory';
import {
	validationCreateProductHistory,
	validationSendIds,
	validationUpdateProductHistory,
} from '../validation/productHistory';
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('productHistory'));
router.get('/', getProductHistories);
router.get('/unique', getUniqueProductHistories);
router.post('/', validationCreateProductHistory, createProductHistory);
router.put('/soft-delete', validationSendIds, softDeleteProductHistories);
router.put('/restore', validationSendIds, restoreProductHistories);
router.delete('/force-delete', validationSendIds, forceDeleteProductHistories);

router.get('/:id', getProductHistoryById);
router.put('/:id', validationUpdateProductHistory, updateProductHistory);

export default router;
