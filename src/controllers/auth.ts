import { Request, Response } from 'express';
import { handleChangePassword, handleForgotPassword, handleSignIn } from '../services/auth';
import InvariantError from '../exeptions/InvariantError';
import { errorResponse, successResponse } from '../utils/response';

export const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, password } = req.body;

    if (password && !regexPassword.test(password)) {
      throw new InvariantError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
    }

    const { user, token, expiresIn } = await handleSignIn(identifier, password);

    successResponse(res, 'Login success', 200, { user, token, expiresIn });
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

// Change Password Feature
const changePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!userId) {
      throw new InvariantError('User not found, please login again');
    }

    if (!regexPassword.test(newPassword)) {
      throw new InvariantError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      );
    }

    await handleChangePassword(userId, oldPassword, newPassword);

    successResponse(res, 'Password changed successfully', 200, null);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, newPassword } = req.body;
    await handleForgotPassword(identifier, newPassword);
    successResponse(res, 'Password changed successfully', 200, null);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export { signIn, changePassword, forgotPassword };
