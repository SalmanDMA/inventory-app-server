import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationUploadImage = [
  body('image').notEmpty().withMessage('Image needs to be filled').isString().withMessage('Image must be a string'),
  body('folder').notEmpty().withMessage('Folder needs to be filled').isString().withMessage('Folder must be a string'),
  body('prefix').notEmpty().withMessage('Prefix needs to be filled').isString().withMessage('Prefix must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

const validationRemoveImage = [
  body('public_id')
    .notEmpty()
    .withMessage('Public ID needs to be filled')
    .isString()
    .withMessage('Image must be a string'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

export { validationUploadImage, validationRemoveImage };
