import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateWarehouse = [
  body('name')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('location')
    .notEmpty()
    .withMessage('Location needs to be filled')
    .isString()
    .withMessage('Location must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationUpdateWarehouse = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  body('location').optional().isString().withMessage('Location must be a string'),

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

export { validationCreateWarehouse, validationUpdateWarehouse, validationSendIds };
