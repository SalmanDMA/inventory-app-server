import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';
import { regexPassword } from '../controllers/auth';

const validationCreateUser = [
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
  body('username')
    .notEmpty()
    .withMessage('Username needs to be filled')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('password')
    .notEmpty()
    .withMessage('Password needs to be filled')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(regexPassword)
    .withMessage(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),
  body('roleId').notEmpty().withMessage('Role needs to be filled').isString().withMessage('Role must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationUpdateUser = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters long'),
  body('username')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .notEmpty()
    .withMessage('Email needs to be filled')
    .isString()
    .withMessage('Email must be a string')
    .isEmail()
    .withMessage('Email must be valid'),
  body('roleId').notEmpty().withMessage('Role needs to be filled').isString().withMessage('Role must be a string'),

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

export { validationCreateUser, validationUpdateUser, validationSendIds };
