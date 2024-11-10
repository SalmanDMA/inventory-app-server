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
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('module'));
router.get('/', getModules);
router.post('/', validationCreateModule, createModule);
router.put('/soft-delete', validationSendIds, softDeleteModules);
router.put('/restore', validationSendIds, restoreModules);
router.delete('/force-delete', validationSendIds, forceDeleteModules);
router.get('/:id', getModuleById);
router.put('/:id', validationUpdateModule, updateModule);

export default router;
