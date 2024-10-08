import { NextFunction, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import InvariantError from '../exeptions/InvariantError';

const validationCreateOrUpdateRoleModule = [
  body('roleId')
    .notEmpty()
    .withMessage('Role ID needs to be filled')
    .isString()
    .withMessage('Role ID must be a string'),

  body('moduleId').notEmpty().withMessage('Module ID needs to be filled'),

  body('checked')
    .notEmpty()
    .withMessage('Checked needs to be filled')
    .isBoolean()
    .withMessage('Checked must be a boolean'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new InvariantError(errors.array()[0].msg);
    }
    next();
  },
];

export { validationCreateOrUpdateRoleModule };
