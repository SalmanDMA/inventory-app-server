import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateUpload = [
  body('filename')
    .notEmpty()
    .withMessage('Filename needs to be filled')
    .isString()
    .withMessage('Filename must be a string')
    .isLength({ min: 3 })
    .withMessage('Filename must be at least 3 characters long'),

  body('category')
    .notEmpty()
    .withMessage('Category needs to be filled')
    .isString()
    .withMessage('Category must be a string'),

  body('path').notEmpty().withMessage('Path needs to be filled').isString().withMessage('Path must be a string'),

  body('type').notEmpty().withMessage('Type needs to be filled').isString().withMessage('Type must be a string'),

  body('mime')
    .notEmpty()
    .withMessage('MIME type needs to be filled')
    .isString()
    .withMessage('MIME type must be a string'),

  body('extension')
    .notEmpty()
    .withMessage('File extension needs to be filled')
    .isString()
    .withMessage('File extension must be a string'),

  body('size')
    .notEmpty()
    .withMessage('Size needs to be filled')
    .isInt({ min: 1 })
    .withMessage('Size must be a positive integer'),

  body('filenameOrigin')
    .notEmpty()
    .withMessage('Original filename needs to be filled')
    .isString()
    .withMessage('Original filename must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationUpdateUpload = [
  body('filename')
    .isString()
    .withMessage('Filename must be a string')
    .isLength({ min: 3 })
    .withMessage('Filename must be at least 3 characters long'),

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

export { validationCreateUpload, validationUpdateUpload, validationSendIds };
