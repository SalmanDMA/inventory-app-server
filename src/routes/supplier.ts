import { Router } from 'express';
import {
	createSupplier,
	forceDeleteSuppliers,
	getSupplierById,
	getSuppliers,
	restoreSuppliers,
	softDeleteSuppliers,
	updateSupplier,
} from '../controllers/supplier';
import { validationCreateSupplier, validationSendIds, validationUpdateSupplier } from '../validation/supplier';
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('supplier'));
router.get('/', getSuppliers);
router.post('/', validationCreateSupplier, createSupplier);
router.put('/soft-delete', validationSendIds, softDeleteSuppliers);
router.put('/restore', validationSendIds, restoreSuppliers);
router.delete('/force-delete', validationSendIds, forceDeleteSuppliers);

router.get('/:id', getSupplierById);
router.put('/:id', validationUpdateSupplier, updateSupplier);

export default router;
