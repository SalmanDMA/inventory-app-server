import { Request, Response, NextFunction } from 'express';
import { RoleModuleRepository } from '../repositories/roleModule';
import AuthenticationError from '../exeptions/AuthenticationError';
import ClientError from '../exeptions/ClientError';
import { ModuleRepository } from '../repositories/module';

const roleModuleRepository = new RoleModuleRepository();
const moduleRepository = new ModuleRepository();

export const checkModuleAccess = (moduleName: string) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			const user = req.user;
			if (!user) {
				throw new AuthenticationError('User not authenticated or role not provided');
			}

			const roleId = user.roleId;

			const moduleId = await moduleRepository.getModuleByName(moduleName);
			const roleModule = await roleModuleRepository.getRoleModuleByRoleAndModule(
				roleId,
				moduleId?.moduleId as number
			);

			if (!roleModule) {
				return res.status(403).json({ message: 'Access denied for this module' });
			}

			next();
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ message: error.message || 'Internal server error' });
			} else if (error instanceof ClientError) {
				res.status(error.statusCode).json({ message: error.message });
			} else {
				res.status(500).json({ message: 'Internal server error' });
			}
		}
	};
};
