import { Router } from 'express';
import {
  createCustomer,
  forceDeleteCustomers,
  getCustomerById,
  getCustomers,
  restoreCustomers,
  softDeleteCustomers,
  updateCustomer,
} from '../controllers/customer';
import { validationCreateCustomer, validationSendIds, validationUpdateCustomer } from '../validation/customer';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', verifyAdmin, getCustomers);
router.post('/', verifyAdmin, validationCreateCustomer, createCustomer);
router.put('/soft-delete', verifyAdmin, validationSendIds, softDeleteCustomers);
router.put('/restore', verifyAdmin, validationSendIds, restoreCustomers);
router.delete('/force-delete', verifyAdmin, validationSendIds, forceDeleteCustomers);

router.get('/:id', getCustomerById);
router.put('/:id', verifyAdmin, validationUpdateCustomer, updateCustomer);

export default router;
