import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { ModuleTypeService } from '../services/moduleType';

const moduleTypeService = new ModuleTypeService();

export const getModulesTypes = async (req: Request, res: Response): Promise<void> => {
  try {
    const modulesTypes = await moduleTypeService.getModulesTypes();
    successResponse(res, 'Module types retrieved successfully', 200, modulesTypes);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getModuleTypeById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const moduleType = await moduleTypeService.getModuleTypeById(id);
    successResponse(res, 'Module type retrieved successfully', 200, moduleType);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createModuleType = async (req: Request, res: Response): Promise<void> => {
  try {
    const moduleType = await moduleTypeService.createModuleType(req.body);
    successResponse(res, 'Module type created successfully', 201, moduleType);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateModuleType = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      moduleId: id,
    };
    const moduleType = await moduleTypeService.updateModuleType(dataToSend);
    successResponse(res, 'ModuleType updated successfully', 200, moduleType);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteModuleTypes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await moduleTypeService.softDeleteModulesTypes(ids);
    successResponse(res, 'ModuleTypes deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreModuleTypes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await moduleTypeService.restoreModulesTypes(ids);
    successResponse(res, 'ModuleTypes restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteModuleTypes = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await moduleTypeService.forceDeleteModulesTypes(ids);
    successResponse(res, 'ModuleTypes deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
