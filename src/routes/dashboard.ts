import { Router } from 'express';
import { getDashboardMetrics } from '../controllers/dashboard';
import { authCheck } from '../middlewares/auth';

const router = Router();

router.use(authCheck);
router.get('/', getDashboardMetrics);

export default router;
