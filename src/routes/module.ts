import { Router } from 'express';
import {
  createModule,
  forceDeleteModules,
  getModuleById,
  getModules,
  restoreModules,
  softDeleteModules,
  updateModule,
} from '../controllers/module';
import { validationCreateModule, validationSendIds, validationUpdateModule } from '../validation/module';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck, verifyAdmin);
router.get('/', getModules);
router.post('/', validationCreateModule, createModule);
router.put('/soft-delete', validationSendIds, softDeleteModules);
router.put('/restore', validationSendIds, restoreModules);
router.delete('/force-delete', validationSendIds, forceDeleteModules);
router.get('/:id', getModuleById);
router.put('/:id', validationUpdateModule, updateModule);

export default router;
