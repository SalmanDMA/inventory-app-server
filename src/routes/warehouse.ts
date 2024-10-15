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
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', verifyAdmin, getWarehouses);
router.post('/', verifyAdmin, validationCreateWarehouse, createWarehouse);
router.put('/soft-delete', verifyAdmin, validationSendIds, softDeleteWarehouses);
router.put('/restore', verifyAdmin, validationSendIds, restoreWarehouses);
router.delete('/force-delete', verifyAdmin, validationSendIds, forceDeleteWarehouses);

router.get('/:id', getWarehouseById);
router.put('/:id', verifyAdmin, validationUpdateWarehouse, updateWarehouse);

export default router;
