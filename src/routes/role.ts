import { Router } from 'express';
import {
  createRole,
  forceDeleteRoles,
  getRoleById,
  getRoles,
  restoreRoles,
  softDeleteRoles,
  updateRole,
} from '../controllers/role';
import { validationCreateRole, validationSendIds, validationUpdateRole } from '../validation/role';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck, verifyAdmin);
router.get('/', getRoles);
router.post('/', validationCreateRole, createRole);
router.put('/soft-delete', validationSendIds, softDeleteRoles);
router.put('/restore', validationSendIds, restoreRoles);
router.delete('/force-delete', validationSendIds, forceDeleteRoles);
router.get('/:id', getRoleById);
router.put('/:id', validationUpdateRole, updateRole);

export default router;
