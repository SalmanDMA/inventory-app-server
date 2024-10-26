import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateProductHistory = [
  body('productId').notEmpty().withMessage('Name needs to be filled').isString().withMessage('Name must be a string'),
  body('oldPrice')
    .notEmpty()
    .withMessage('Old Price needs to be filled')
    .isNumeric()
    .withMessage('Old Price must be a number'),
  body('newPrice')
    .notEmpty()
    .withMessage('New Price needs to be filled')
    .isNumeric()
    .withMessage('New Price must be a number'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationUpdateProductHistory = [
  body('productId').optional().isString().withMessage('Product Id must be a string'),
  body('oldPrice').optional().isNumeric().withMessage('Old Price must be a number'),
  body('newPrice').optional().isNumeric().withMessage('New Price must be a number'),

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

export { validationCreateProductHistory, validationUpdateProductHistory, validationSendIds };
