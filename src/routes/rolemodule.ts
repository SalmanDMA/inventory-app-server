import { Router } from 'express';
import { validationCreateOrUpdateRoleModule } from '../validation/rolemodule';
import { createOrUpdateRoleModule, getRoleModules } from '../controllers/rolemodule';
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('roleModule'));
router.get('/:roleId/modules', getRoleModules);
router.post('/:roleId/modules', validationCreateOrUpdateRoleModule, createOrUpdateRoleModule);

export default router;
