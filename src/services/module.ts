import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { RoleModuleRepository } from '../repositories/roleModule';
import { ModuleRepository } from '../repositories/module';
import { IModule } from '../types/model';

const roleModuleRepository = new RoleModuleRepository();
const moduleRepository = new ModuleRepository();

export class ModuleService {
  async getModules() {
    return await moduleRepository.getAllModules();
  }

  async getModuleById(id: number) {
    const module = await moduleRepository.getModuleById(id);

    if (!module) {
      throw new NotFoundError('Module not found, please register first');
    }

    return module;
  }

  async updateModule(module: IModule) {
    const moduleData = await moduleRepository.getModuleById(module.moduleId as number);

    if (!moduleData) {
      throw new NotFoundError('Module not found, please register first');
    }

    if (module.name && module.name.toLocaleLowerCase() !== moduleData.name.toLocaleLowerCase()) {
      const moduleExist = await moduleRepository.getModuleByName(module.name.toLocaleLowerCase());
      if (moduleExist) {
        throw new InvariantError('Module already exists, please try another name');
      }
    }

    let path = moduleData.path;

    if (module.parentId && module.parentId !== moduleData.parentId) {
      const parentModule = await moduleRepository.getModuleById(module.parentId);
      if (parentModule) {
        path = `${parentModule.path}/${module.moduleId}`.replace(/\/+/g, '/');
      } else {
        throw new NotFoundError('Parent module not found');
      }
    } else if (!module.parentId) {
      path = `/${module.moduleId}`;
    }

    const parseParentId =
      typeof module.parentId === 'number'
        ? module.parentId
        : module.parentId
        ? parseInt(module.parentId as unknown as string, 10)
        : null;

    const parseModuleId =
      typeof module.moduleId === 'number' ? module.moduleId : parseInt(module.moduleId as unknown as string, 10);

    const updatedModuleData = {
      ...moduleData,
      ...module,
      path,
      parentId: parseParentId,
      moduleId: parseModuleId,
    };

    const updatedModule = await moduleRepository.update(updatedModuleData);

    return updatedModule;
  }

  async createModule(module: IModule) {
    if (module.name) {
      const moduleExist = await moduleRepository.getModuleByName(module.name.toLocaleLowerCase());
      if (moduleExist) {
        throw new InvariantError('Module already exists, please try another name');
      }
    }

    const parseParentId =
      typeof module.parentId === 'number'
        ? module.parentId
        : module.parentId
        ? parseInt(module.parentId as unknown as string, 10)
        : null;

    const createdModule = await moduleRepository.create({
      ...module,
      parentId: parseParentId,
    });

    let path = `/${createdModule.moduleId}`;

    if (createdModule.parentId) {
      const parentModule = await moduleRepository.getModuleById(createdModule.parentId);
      if (parentModule) {
        path = `${parentModule.path}/${createdModule.moduleId}`;
      }
    }

    createdModule.path = path;
    await moduleRepository.update(createdModule);

    return createdModule;
  }

  async softDeleteModules(moduleIds: number[]) {
    for (const moduleId of moduleIds) {
      const moduleData = await moduleRepository.getModuleById(moduleId);
      if (!moduleData) {
        throw new NotFoundError(`Module with ID ${moduleId} not found, please register first`);
      }

      const childModules = await moduleRepository.getChildModules(moduleId);
      if (childModules && childModules.length > 0) {
        await this.softDeleteModules(childModules.map((child) => child.moduleId as number));
      }

      await moduleRepository.softDelete(moduleData.moduleId as number);
    }
  }

  async restoreModules(moduleIds: number[]) {
    for (const moduleId of moduleIds) {
      const moduleData = await moduleRepository.getModuleById(moduleId);
      if (!moduleData) {
        throw new NotFoundError(`Module with ID ${moduleId} not found, please register first`);
      }

      const childModules = await moduleRepository.getChildModules(moduleId);
      if (childModules && childModules.length > 0) {
        await this.restoreModules(childModules.map((child) => child.moduleId as number));
      }

      await moduleRepository.restore(moduleData.moduleId as number);
    }
  }

  async forceDeleteModules(moduleIds: number[]) {
    for (const moduleId of moduleIds) {
      const moduleData = await moduleRepository.getModuleById(moduleId);
      if (!moduleData) {
        throw new NotFoundError(`Module with ID ${moduleId} not found, please register first`);
      }

      const roleModules = await roleModuleRepository.getRoleModulesByModuleId(moduleId);
      if (roleModules && roleModules.length > 0) {
        await this.forceDeleteRoleModules(roleModules.map((roleModule) => roleModule.roleModuleId as string));
      }

      const childModules = await moduleRepository.getChildModules(moduleId);
      if (childModules && childModules.length > 0) {
        await this.forceDeleteModules(childModules.map((child) => child.moduleId as number));
      }

      await moduleRepository.forceDelete(moduleData.moduleId as number);
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
