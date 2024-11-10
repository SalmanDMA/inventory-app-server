import { Router } from 'express';
import {
	createWarehouse,
	forceDeleteWarehouses,
	getWarehouseById,
	getWarehouses,
	restoreWarehouses,
	softDeleteWarehouses,
	updateWarehouse,
} from '../controllers/warehouse';
import { validationCreateWarehouse, validationSendIds, validationUpdateWarehouse } from '../validation/warehouse';
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('warehouse'));
router.get('/', getWarehouses);
router.post('/', validationCreateWarehouse, createWarehouse);
router.put('/soft-delete', validationSendIds, softDeleteWarehouses);
router.put('/restore', validationSendIds, restoreWarehouses);
router.delete('/force-delete', validationSendIds, forceDeleteWarehouses);

router.get('/:id', getWarehouseById);
router.put('/:id', validationUpdateWarehouse, updateWarehouse);

export default router;
