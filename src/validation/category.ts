import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateCategory = [
  body('name')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationUpdateCategory = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationSendIds = [
  body('ids').isArray().withMessage('Ids must be an array of strings').notEmpty().withMessage('Ids needs to be filled'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

export { validationCreateCategory, validationUpdateCategory, validationSendIds };
