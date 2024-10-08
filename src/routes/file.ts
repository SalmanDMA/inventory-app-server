import { Router } from 'express';
import { authCheck } from '../middlewares/auth';
import { getFile } from '../controllers/file';

const router = Router();

router.use(authCheck);
router.get('/:id', getFile);

export default router;
