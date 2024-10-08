import { Request, Response } from 'express';
import { successResponse, errorResponse } from '../utils/response';
import { ModuleService } from '../services/module';

const moduleService = new ModuleService();

export const getModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const modules = await moduleService.getModules();
    successResponse(res, 'Modules retrieved successfully', 200, modules);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getModuleById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const module = await moduleService.getModuleById(parseInt(id, 10));
    successResponse(res, 'Module retrieved successfully', 200, module);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const module = await moduleService.createModule(req.body);
    successResponse(res, 'Module created successfully', 201, module);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateModule = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      moduleId: id,
    };
    const module = await moduleService.updateModule(dataToSend);
    successResponse(res, 'Module updated successfully', 200, module);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await moduleService.softDeleteModules(ids);
    successResponse(res, 'Modules deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await moduleService.restoreModules(ids);
    successResponse(res, 'Modules restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteModules = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await moduleService.forceDeleteModules(ids);
    successResponse(res, 'Modules deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
