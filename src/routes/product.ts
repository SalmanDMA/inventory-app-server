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
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';
import { getProductHistoriesByProductId } from '../controllers/productHistory';

const router = Router();

router.use(authCheck, checkModuleAccess('product'));
router.get('/', getProducts);
router.post('/', validationCreateProduct, createProduct);
router.put('/soft-delete', validationSendIds, softDeleteProducts);
router.put('/restore', validationSendIds, restoreProducts);
router.delete('/force-delete', validationSendIds, forceDeleteProducts);

router.get('/:id', getProductById);
router.put('/:id', validationUpdateProduct, updateProduct);
router.get('/:id/histories', getProductHistoriesByProductId);

export default router;
