import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';
import { regexPassword } from '../controllers/auth';

const validationSignin = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or Username needs to be filled')
    .isString()
    .withMessage('Email or Username must be a string'),

  body('password')
    .notEmpty()
    .withMessage('Password needs to be filled')
    .isString()
    .withMessage('Password must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationChangePassword = [
  body('oldPassword')
    .notEmpty()
    .withMessage('Old password needs to be filled')
    .isString()
    .withMessage('Old password must be a string')
    .isLength({ min: 8 })
    .withMessage('Old password must be at least 8 characters long'),
  body('newPassword')
    .notEmpty()
    .withMessage('New password needs to be filled')
    .isString()
    .withMessage('New password must be a string')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(regexPassword)
    .withMessage(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationForgotPassword = [
  body('identifier')
    .notEmpty()
    .withMessage('Email or Username needs to be filled')
    .isString()
    .withMessage('Email or Username must be a string'),

  body('newPassword')
    .notEmpty()
    .withMessage('New password needs to be filled')
    .isString()
    .withMessage('New password must be a string')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters long')
    .matches(regexPassword)
    .withMessage(
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    ),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

export { validationSignin, validationChangePassword, validationForgotPassword };
