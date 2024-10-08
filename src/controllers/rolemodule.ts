import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { RoleModuleService } from '../services/roleModule';
import { IRoleModules } from '../types/model';

const roleModuleService = new RoleModuleService();

export const getRoleModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const { roleId } = req.params;
    const roleModule = await roleModuleService.getRoleModules(roleId);
    successResponse(res, 'RoleModule retrieved successfully', 200, roleModule);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createOrUpdateRoleModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const roleModuleRequest: IRoleModules = req.body;

    const { roleId } = req.params;
    const roleModuleResponse = await roleModuleService.createOrUpdateRoleModule(roleId, roleModuleRequest);

    successResponse(res, 'Role module created or updated successfully', 201, roleModuleResponse);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Internal server error';
    errorResponse(res, errorMessage);
  }
};
