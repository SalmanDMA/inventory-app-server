import { Request, Response } from 'express';
import { UserService } from '../services/user';
import { successResponse, errorResponse } from '../utils/response';

const userService = new UserService();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getUsers();
    successResponse(res, 'Users retrieved successfully', 200, users);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    successResponse(res, 'User retrieved successfully', 200, user);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getCurrentUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = req.user;
    if (!user) {
      errorResponse(res, 'User not found, please login first');
    }

    const userData = await userService.getUserById(user.id);

    if (!userData) {
      errorResponse(res, 'User not found, please register first');
    }

    successResponse(res, 'User retrieved successfully', 200, userData);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userService.createUser(req.body);
    successResponse(res, 'User created successfully', 201, user);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      userId: id,
    };
    const user = await userService.updateUser(dataToSend);
    successResponse(res, 'User updated successfully', 200, user);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateProfileUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userDataLogin = req.user;
    const dataToSend = {
      ...req.body,
      userId: userDataLogin.id,
    };

    const user = await userService.updateUser(dataToSend);
    successResponse(res, 'User updated successfully', 200, user);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await userService.softDeleteUsers(ids);
    successResponse(res, 'Users deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await userService.restoreUsers(ids);
    successResponse(res, 'Users restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await userService.forceDeleteUsers(ids);
    successResponse(res, 'Users deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
