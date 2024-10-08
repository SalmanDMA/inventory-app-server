import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { RoleService } from '../services/role';

const roleService = new RoleService();

export const getRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const roles = await roleService.getRoles();
    successResponse(res, 'Roles retrieved successfully', 200, roles);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getRoleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);
    successResponse(res, 'Role retrieved successfully', 200, role);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const role = await roleService.createRole(req.body);
    successResponse(res, 'Role created successfully', 201, role);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      roleId: id,
    };
    const role = await roleService.updateRole(dataToSend);
    successResponse(res, 'Role updated successfully', 200, role);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await roleService.softDeleteRoles(ids);
    successResponse(res, 'Roles deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await roleService.restoreRoles(ids);
    successResponse(res, 'Roles restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteRoles = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await roleService.forceDeleteRoles(ids);
    successResponse(res, 'Roles deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
