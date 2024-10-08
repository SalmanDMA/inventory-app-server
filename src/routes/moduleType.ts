import { Router } from 'express';
import {
  createModuleType,
  forceDeleteModuleTypes,
  getModulesTypes,
  getModuleTypeById,
  restoreModuleTypes,
  softDeleteModuleTypes,
  updateModuleType,
} from '../controllers/moduleType';
import { validationCreateModuleType, validationSendIds, validationUpdateModuleType } from '../validation/moduleType';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck, verifyAdmin);
router.get('/', getModulesTypes);
router.post('/', validationCreateModuleType, createModuleType);
router.put('/soft-delete', validationSendIds, softDeleteModuleTypes);
router.put('/restore', validationSendIds, restoreModuleTypes);
router.delete('/force-delete', validationSendIds, forceDeleteModuleTypes);
router.get('/:id', getModuleTypeById);
router.put('/:id', validationUpdateModuleType, updateModuleType);

export default router;
