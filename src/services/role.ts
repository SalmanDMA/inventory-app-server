import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { RoleRepository } from '../repositories/role';
import { RoleModuleRepository } from '../repositories/roleModule';
import { IRole } from '../types/model';

const roleRepository = new RoleRepository();
const roleModuleRepository = new RoleModuleRepository();

export class RoleService {
  async getRoles() {
    return await roleRepository.getAllRoles();
  }

  async getRoleById(id: string) {
    const role = await roleRepository.getRoleById(id);

    if (!role) {
      throw new NotFoundError('Role not found, please register first');
    }

    return role;
  }

  async updateRole(role: IRole) {
    const roleData = await roleRepository.getRoleById(role.roleId);

    if (!roleData) {
      throw new NotFoundError('Role not found, please register first');
    }

    if (role.name) {
      const roleExist = await roleRepository.getRoleByName(role.name.toLocaleLowerCase());
      if (roleExist) {
        throw new InvariantError('Role already exist, please try another name');
      }
    }

    const updatedRole = await roleRepository.update(role);

    return updatedRole;
  }

  async createRole(role: IRole) {
    if (role.name) {
      const roleExist = await roleRepository.getRoleByName(role.name.toLocaleLowerCase());
      if (roleExist) {
        throw new InvariantError('Role already exist, please try another name');
      }
    }

    const createdRole = await roleRepository.create(role);
    return createdRole;
  }

  async softDeleteRoles(roleIds: string[]) {
    for (const roleId of roleIds) {
      const roleData = await roleRepository.getRoleById(roleId);
      if (!roleData) {
        throw new NotFoundError(`Role with ID ${roleId} not found, please register first`);
      }
      await roleRepository.softDelete(roleData.roleId);
    }
  }

  async restoreRoles(roleIds: string[]) {
    for (const roleId of roleIds) {
      const roleData = await roleRepository.getRoleById(roleId);
      if (!roleData) {
        throw new NotFoundError(`Role with ID ${roleId} not found, please register first`);
      }
      await roleRepository.restore(roleData.roleId);
    }
  }

  async forceDeleteRoles(roleIds: string[]) {
    for (const roleId of roleIds) {
      const roleData = await roleRepository.getRoleById(roleId);
      if (!roleData) {
        throw new NotFoundError(`Role with ID ${roleId} not found, please register first`);
      }

      const roleModules = await roleModuleRepository.getRoleModulesByRoleId(roleId);
      if (roleModules && roleModules.length > 0) {
        await this.forceDeleteRoleModules(roleModules.map((roleModule) => roleModule.roleModuleId as string));
      }

      await roleRepository.forceDelete(roleData.roleId);
    }
  }

  async forceDeleteRoleModules(roleModuleIds: string[]) {
    for (const roleModuleId of roleModuleIds) {
      const roleModuleData = await roleModuleRepository.getRoleModuleById(roleModuleId);
      if (!roleModuleData) {
        throw new NotFoundError(`Role module with ID ${roleModuleId} not found`);
      }

      await roleModuleRepository.deleteRoleModule(roleModuleData.roleModuleId as string);
    }
  }
}
