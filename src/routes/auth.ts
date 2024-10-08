import express from 'express';
import { changePassword, forgotPassword, signIn } from '../controllers/auth';
import { authCheck } from '../middlewares/auth';
import { validationChangePassword, validationForgotPassword, validationSignin } from '../validation/auth';

const router = express.Router();

router.post('/login', validationSignin, signIn);
router.post('/forgot-password', validationForgotPassword, forgotPassword);
router.post('/change-password', authCheck, validationChangePassword, changePassword);

export default router;
