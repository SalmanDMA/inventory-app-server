import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/dashboard';
import { authCheck } from '../middlewares/auth';
import { checkModuleAccess } from '../middlewares/checkModuleAccess';

const router = Router();

router.use(authCheck, checkModuleAccess('dashboard'));
router.get('/', getDashboardMetrics);

export default router;
