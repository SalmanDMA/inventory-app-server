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
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('customer'));
router.get('/', getCustomers);
router.post('/', validationCreateCustomer, createCustomer);
router.put('/soft-delete', validationSendIds, softDeleteCustomers);
router.put('/restore', validationSendIds, restoreCustomers);
router.delete('/force-delete', validationSendIds, forceDeleteCustomers);

router.get('/:id', getCustomerById);
router.put('/:id', validationUpdateCustomer, updateCustomer);

export default router;
