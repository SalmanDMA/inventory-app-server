import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateStockMovement = [
	body('productId')
		.notEmpty()
		.withMessage('Product Id needs to be filled')
		.isString()
		.withMessage('Product Id must be a string'),
	body('warehouseId')
		.notEmpty()
		.withMessage('Warehouse Id needs to be filled')
		.isString()
		.withMessage('Warehouse Id must be a string'),
	body('movementType')
		.notEmpty()
		.withMessage('Movement Type needs to be filled')
		.isString()
		.withMessage('Movement Type must be a string')
		.custom((value) => {
			if (value !== 'IN' && value !== 'OUT') {
				throw new Error('Movement Type must be IN or OUT');
			}
			return true;
		}),
	body('quantity')
		.notEmpty()
		.withMessage('Quantity needs to be filled')
		.isNumeric()
		.withMessage('Quantity must be a number')
		.isInt({ min: 1 })
		.withMessage('Quantity must be a positive number'),
	body('transactionDate')
		.notEmpty()
		.withMessage('Transaction Date needs to be filled')
		.isString()
		.withMessage('Transaction Date must be a string'),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new InvariantError(errors.array()[0].msg);
		}
		next();
	},
];

const validationUpdateStockMovement = [
	body('productId').optional().isString().withMessage('Product Id must be a string'),
	body('warehouseId').optional().isString().withMessage('Warehouse Id must be a string'),
	body('movementType')
		.optional()
		.isString()
		.withMessage('Movement Type must be a string')
		.custom((value) => {
			if (value && value !== 'IN' && value !== 'OUT') {
				throw new Error('Movement Type must be IN or OUT');
			}
			return true;
		}),
	body('quantity')
		.optional()
		.isNumeric()
		.withMessage('Quantity must be a number')
		.isInt({ min: 1 })
		.withMessage('Quantity must be a positive number'),
	body('transactionDate').optional().isString().withMessage('Transaction Date must be a string'),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new InvariantError(errors.array()[0].msg);
		}
		next();
	},
];

const validationSendIds = [
	body('ids')
		.isArray()
		.withMessage('Ids must be an array of strings')
		.notEmpty()
		.withMessage('Ids needs to be filled')
		.custom((value) => {
			for (const id of value) {
				if (typeof id !== 'string') {
					throw new Error('Each ID must be a string');
				}
			}
			return true;
		}),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			throw new InvariantError(errors.array()[0].msg);
		}
		next();
	},
];

export { validationCreateStockMovement, validationUpdateStockMovement, validationSendIds };
