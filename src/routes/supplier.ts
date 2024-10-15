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
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', verifyAdmin, getSuppliers);
router.post('/', verifyAdmin, validationCreateSupplier, createSupplier);
router.put('/soft-delete', verifyAdmin, validationSendIds, softDeleteSuppliers);
router.put('/restore', verifyAdmin, validationSendIds, restoreSuppliers);
router.delete('/force-delete', verifyAdmin, validationSendIds, forceDeleteSuppliers);

router.get('/:id', getSupplierById);
router.put('/:id', verifyAdmin, validationUpdateSupplier, updateSupplier);

export default router;
