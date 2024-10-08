import express from 'express';
import { removeImage, uploadImage } from '../controllers/cloudinary';
import { authCheck } from '../middlewares/auth';
import { validationRemoveImage, validationUploadImage } from '../validation/cloudinary';

const router = express.Router();

router.use(authCheck);
router.post('/upload-image', validationUploadImage, uploadImage);
router.post('/remove-image', validationRemoveImage, removeImage);

export default router;
