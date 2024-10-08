import { Router } from 'express';
import {
  createUser,
  forceDeleteUsers,
  getUserById,
  getUsers,
  getCurrentUser,
  restoreUsers,
  softDeleteUsers,
  updateUser,
  updateProfileUser,
} from '../controllers/user';
import { validationCreateUser, validationSendIds, validationUpdateUser } from '../validation/user';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', verifyAdmin, getUsers);
router.post('/', verifyAdmin, validationCreateUser, createUser);
router.put('/soft-delete', verifyAdmin, validationSendIds, softDeleteUsers);
router.put('/restore', verifyAdmin, validationSendIds, restoreUsers);
router.delete('/force-delete', verifyAdmin, validationSendIds, forceDeleteUsers);

router.get('/me', getCurrentUser);
router.put('/me', validationUpdateUser, updateProfileUser);
router.put('/me/soft-delete', validationSendIds, softDeleteUsers);

router.get('/:id', getUserById);
router.put('/:id', verifyAdmin, validationUpdateUser, updateUser);

export default router;
