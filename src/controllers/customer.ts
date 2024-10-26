import { Request, Response } from 'express';
import { CustomerService } from '../services/customer';
import { successResponse, errorResponse } from '../utils/response';

const customerService = new CustomerService();

export const getCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const customers = await customerService.getCustomers();
    successResponse(res, 'Customers retrieved successfully', 200, customers);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customer = await customerService.getCustomerById(id);
    successResponse(res, 'Customer retrieved successfully', 200, customer);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const createCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const customer = await customerService.createCustomer(req.body);
    successResponse(res, 'Customer created successfully', 201, customer);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const dataToSend = {
      ...req.body,
      customerId: id,
    };
    const customer = await customerService.updateCustomer(dataToSend);
    successResponse(res, 'Customer updated successfully', 200, customer);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const softDeleteCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await customerService.softDeleteCustomers(ids);
    successResponse(res, 'Customers deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const restoreCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await customerService.restoreCustomers(ids);
    successResponse(res, 'Customers restored successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};

export const forceDeleteCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { ids } = req.body;
    await customerService.forceDeleteCustomers(ids);
    successResponse(res, 'Customers deleted successfully', 200);
  } catch (error) {
    const errorMessage = (error as Error).message || 'Something went wrong';
    errorResponse(res, errorMessage);
  }
};
