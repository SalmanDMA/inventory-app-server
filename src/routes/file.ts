import { Router } from 'express';
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';
import { getFile } from '../controllers/file';

const router = Router();

router.use(authCheck, checkModuleAccess('file'));
router.get('/:id', getFile);

export default router;
