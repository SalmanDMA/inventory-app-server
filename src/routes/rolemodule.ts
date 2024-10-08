import { Router } from 'express';
import { validationCreateOrUpdateRoleModule } from '../validation/rolemodule';
import { createOrUpdateRoleModule, getRoleModules } from '../controllers/rolemodule';
import { authCheck, verifyAdmin } from '../middlewares/auth';

const router = Router();

router.use(authCheck, verifyAdmin);
router.get('/:roleId/modules', getRoleModules);
router.post('/:roleId/modules', validationCreateOrUpdateRoleModule, createOrUpdateRoleModule);

export default router;
