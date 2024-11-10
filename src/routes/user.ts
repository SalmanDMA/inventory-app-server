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
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('user'));
router.get('/', getUsers);
router.post('/', validationCreateUser, createUser);
router.put('/soft-delete', validationSendIds, softDeleteUsers);
router.put('/restore', validationSendIds, restoreUsers);
router.delete('/force-delete', validationSendIds, forceDeleteUsers);

router.get('/me', getCurrentUser);
router.put('/me', validationUpdateUser, updateProfileUser);
router.put('/me/soft-delete', validationSendIds, softDeleteUsers);

router.get('/:id', getUserById);
router.put('/:id', validationUpdateUser, updateUser);

export default router;
