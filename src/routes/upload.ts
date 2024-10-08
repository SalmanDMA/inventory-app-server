import { Router } from 'express';
import { authCheck } from '../middlewares/auth';
import {
  createUpload,
  forceDeleteUpload,
  getUploads,
  restoreUpload,
  softDeleteUpload,
  updateUpload,
} from '../controllers/upload';
import { validationCreateUpload, validationSendIds, validationUpdateUpload } from '../validation/upload';

const router = Router();

router.use(authCheck);
router.get('/', getUploads);
router.post('/', validationCreateUpload, createUpload);
router.put('/soft-delete', validationSendIds, softDeleteUpload);
router.put('/restore', validationSendIds, restoreUpload);
router.delete('/force-delete', validationSendIds, forceDeleteUpload);
router.put('/:id', validationUpdateUpload, updateUpload);

export default router;
