import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { IRoleModules } from '../types/model';
import { RoleModuleRepository } from '../repositories/roleModule';

const roleModuleRepository = new RoleModuleRepository();

export class RoleModuleService {
  async getRoleModules(roleId: string) {
    const roleModule = await roleModuleRepository.getRoleModulesByRoleId(roleId);
    if (!roleModule) {
      throw new NotFoundError(`RoleModule not found for roleId ${roleId}`);
    }

    return roleModule;
  }

  async createOrUpdateRoleModule(roleId: string, roleModuleRequest: IRoleModules): Promise<IRoleModules> {
    const existingRoleModule = await roleModuleRepository.getRoleModuleByRoleAndModule(
      roleId,
      roleModuleRequest.moduleId
    );

    if (!existingRoleModule) {
      const newRoleModule: IRoleModules = {
        roleId: roleId,
        moduleId: roleModuleRequest.moduleId,
        checked: roleModuleRequest.checked,
      };

      const createdRoleModule = await roleModuleRepository.insertRoleModule(newRoleModule);
      return createdRoleModule;
    }

    existingRoleModule.checked = roleModuleRequest.checked;

    const updatedRoleModule = await roleModuleRepository.updateRoleModule(
      existingRoleModule.roleModuleId as string,
      existingRoleModule
    );

    return updatedRoleModule;
  }
}
