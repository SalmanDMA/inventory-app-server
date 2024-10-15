import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateSupplier = [
  body('name')
    .notEmpty()
    .withMessage('Name needs to be filled')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email needs to be filled')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Email must be valid'),
  body('phone')
    .notEmpty()
    .withMessage('Phone needs to be filled')
    .isString()
    .withMessage('Phone must be a string')
    .isLength({ min: 3 })
    .withMessage('Phone must be at least 3 characters long'),
  body('address')
    .notEmpty()
    .withMessage('Address needs to be filled')
    .isString()
    .withMessage('Address must be a string')
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 characters long'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationUpdateSupplier = [
  body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('email')
    .optional()
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Email must be valid'),
  body('phone')
    .optional()
    .isString()
    .withMessage('Phone must be a string')
    .isLength({ min: 3 })
    .withMessage('Phone must be at least 3 characters long'),
  body('address')
    .optional()
    .isString()
    .withMessage('Address must be a string')
    .isLength({ min: 3 })
    .withMessage('Address must be at least 3 characters long'),

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

export { validationCreateSupplier, validationUpdateSupplier, validationSendIds };
