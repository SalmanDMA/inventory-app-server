import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateProduct = [
  body('name')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('costPrice')
    .notEmpty()
    .withMessage('Cost Price needs to be filled')
    .isNumeric()
    .withMessage('Cost Price must be a number'),
  body('price').notEmpty().withMessage('Price needs to be filled').isNumeric().withMessage('Price must be a number'),
  body('stock')
    .notEmpty()
    .withMessage('Stock needs to be filled')
    .isNumeric()
    .withMessage('Stock must be a number')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive number'),
  body('reorderLevel')
    .notEmpty()
    .withMessage('Reorder Level needs to be filled')
    .isNumeric()
    .withMessage('Reorder Level must be a number')
    .isInt({ min: 0 })
    .withMessage('Reorder Level must be a positive number'),
  body('categoryId').notEmpty().withMessage('Category Id needs to be filled'),
  body('brandId')
    .notEmpty()
    .withMessage('Brand Id needs to be filled')
    .isString()
    .withMessage('Brand Id must be a string')
    .custom((value) => {
      if (typeof value !== 'string') {
        throw new Error('Brand Id must be a string');
      }
      return true;
    }),
  body('supplierId')
    .notEmpty()
    .withMessage('Supplier Id needs to be filled')
    .isString()
    .withMessage('Supplier Id must be a string')
    .custom((value) => {
      if (typeof value !== 'string') {
        throw new Error('Supplier Id must be a string');
      }
      return true;
    }),
  body('imageId')
    .notEmpty()
    .withMessage('Image Id needs to be filled')
    .isString()
    .withMessage('Image Id must be a string')
    .custom((value) => {
      if (typeof value !== 'string') {
        throw new Error('Image Id must be a string');
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

const validationUpdateProduct = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('costPrice').optional().isNumeric().withMessage('Cost Price must be a number'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('stock')
    .optional()
    .isNumeric()
    .withMessage('Stock must be a number')
    .isInt({ min: 0 })
    .withMessage('Stock must be a positive number'),
  body('reorderLevel')
    .optional()
    .isNumeric()
    .withMessage('Reorder Level must be a number')
    .isInt({ min: 0 })
    .withMessage('Reorder Level must be a positive number'),
  body('categoryId').optional(),
  body('brandId').optional().isString().withMessage('Brand Id must be a string'),
  body('supplierId').optional().isString().withMessage('Supplier Id must be a string'),
  body('imageId').optional().isString().withMessage('Image Id must be a string'),

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

export { validationCreateProduct, validationUpdateProduct, validationSendIds };
