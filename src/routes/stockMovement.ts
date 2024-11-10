import { Router } from 'express';
import {
	createStockMovement,
	forceDeleteStockMovements,
	getStockMovementById,
	getStockMovements,
	restoreStockMovements,
	softDeleteStockMovements,
	updateStockMovement,
} from '../controllers/stockMovement';
import {
	validationCreateStockMovement,
	validationSendIds,
	validationUpdateStockMovement,
} from '../validation/stockMovement';
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('movement'));
router.get('/', getStockMovements);
router.post('/', validationCreateStockMovement, createStockMovement);
router.put('/soft-delete', validationSendIds, softDeleteStockMovements);
router.put('/restore', validationSendIds, restoreStockMovements);
router.delete('/force-delete', validationSendIds, forceDeleteStockMovements);

router.get('/:id', getStockMovementById);
router.put('/:id', validationUpdateStockMovement, updateStockMovement);

export default router;
