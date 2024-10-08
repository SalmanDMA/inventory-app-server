import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { ModuleTypeRepository } from '../repositories/moduleType';
import { ModuleRepository } from '../repositories/module';
import { RoleModuleRepository } from '../repositories/roleModule';
import { IModuleType } from '../types/model';

const moduleTypeRepository = new ModuleTypeRepository();
const moduleRepository = new ModuleRepository();
const roleModuleRepository = new RoleModuleRepository();

export class ModuleTypeService {
  async getModulesTypes() {
    return await moduleTypeRepository.getAllModulesTypes();
  }

  async getModuleTypeById(id: string) {
    const moduleType = await moduleTypeRepository.getModuleTypeById(id);

    if (!moduleType) {
      throw new NotFoundError('Module Type not found, please register first');
    }

    return moduleType;
  }

  async updateModuleType(moduleType: IModuleType) {
    const moduleTypeData = await moduleTypeRepository.getModuleTypeById(moduleType.moduleTypeId);

    if (!moduleTypeData) {
      throw new NotFoundError('Module Type not found, please register first');
    }

    if (moduleType.name && moduleType.name.toLocaleLowerCase() !== moduleTypeData.name.toLocaleLowerCase()) {
      const moduleTypeExist = await moduleTypeRepository.getModuleTypeByName(moduleType.name.toLocaleLowerCase());
      if (moduleTypeExist) {
        throw new InvariantError('ModuleTypes already exists, please try another name');
      }
    }

    const updatedModuleTypesData = {
      ...moduleTypeData,
      ...moduleType,
    };

    const updatedModuleTypes = await moduleTypeRepository.update(updatedModuleTypesData);

    return updatedModuleTypes;
  }

  async createModuleType(moduleType: IModuleType) {
    if (moduleType.name) {
      const moduleTypeExist = await moduleTypeRepository.getModuleTypeByName(moduleType.name.toLocaleLowerCase());
      if (moduleTypeExist) {
        throw new InvariantError('ModuleTypes already exists, please try another name');
      }
    }

    const createdModuleTypes = await moduleTypeRepository.create(moduleType);
    return createdModuleTypes;
  }

  async softDeleteModulesTypes(moduleIds: string[]) {
    for (const moduleId of moduleIds) {
      const moduleTypeData = await moduleTypeRepository.getModuleTypeById(moduleId);
      if (!moduleTypeData) {
        throw new NotFoundError(`ModuleTypes with ID ${moduleId} not found, please register first`);
      }

      await moduleTypeRepository.softDelete(moduleTypeData.moduleTypeId);
    }
  }

  async restoreModulesTypes(moduleIds: string[]) {
    for (const moduleId of moduleIds) {
      const moduleTypeData = await moduleTypeRepository.getModuleTypeById(moduleId);
      if (!moduleTypeData) {
        throw new NotFoundError(`ModuleTypes with ID ${moduleId} not found, please register first`);
      }

      await moduleTypeRepository.restore(moduleTypeData.moduleTypeId);
    }
  }

  async forceDeleteModulesTypes(moduleTypeIds: string[]) {
    for (const moduleTypeId of moduleTypeIds) {
      const moduleTypeData = await moduleTypeRepository.getModuleTypeById(moduleTypeId);
      if (!moduleTypeData) {
        throw new NotFoundError(`ModuleType with ID ${moduleTypeId} not found`);
      }

      const modules = await moduleRepository.getModuleByModuleTypeId(moduleTypeId);
      if (modules && modules.length > 0) {
        for (const module of modules) {
          if (module.roleModules && module.roleModules.length > 0) {
            await this.forceDeleteRoleModules(
              module.roleModules.map((roleModule) => roleModule.roleModuleId as string)
            );
          }

          await this.forceDeleteModules([module.moduleId as number]);
        }
      }

      await moduleTypeRepository.forceDelete(moduleTypeData.moduleTypeId);
    }
  }

  async forceDeleteModules(moduleIds: number[]) {
    for (const moduleId of moduleIds) {
      await moduleRepository.forceDelete(moduleId);
    }
  }

  async forceDeleteRoleModules(roleModuleIds: string[]) {
    for (const roleModuleId of roleModuleIds) {
      await roleModuleRepository.deleteRoleModule(roleModuleId);
    }
  }
}
