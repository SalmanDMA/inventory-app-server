import { PrismaClient } from '@prisma/client';
import { IModule } from '../types/model';

const prisma = new PrismaClient();

export class ModuleRepository {
  async getAllModules(): Promise<IModule[]> {
    const modules = await prisma.modules.findMany({
      include: {
        roleModules: true,
        childModules: true,
        moduleType: true,
        parentModule: true,
      },
    });

    return modules as IModule[];
  }

  async getModuleById(id: number): Promise<IModule | null> {
    const moduleId = typeof id === 'number' ? id : parseInt(id, 10);

    const module = await prisma.modules.findUnique({
      where: {
        moduleId: moduleId,
      },
      include: {
        roleModules: true,
        childModules: true,
        moduleType: true,
        parentModule: true,
      },
    });

    return module as IModule;
  }

  async getModuleByName(name: string): Promise<IModule | null> {
    const module = await prisma.modules.findUnique({
      where: {
        name,
      },
      include: {
        roleModules: true,
        childModules: true,
        moduleType: true,
        parentModule: true,
      },
    });

    return module as IModule;
  }

  async getModuleByModuleTypeId(moduleTypeId: string): Promise<IModule[] | null> {
    const modules = await prisma.modules.findMany({
      where: {
        moduleTypeId,
      },
      include: {
        roleModules: true,
        childModules: true,
        moduleType: true,
        parentModule: true,
      },
    });

    return modules as IModule[];
  }

  async getChildModules(parentId: number): Promise<IModule[]> {
    const childModules = await prisma.modules.findMany({
      where: {
        parentId,
      },
    });

    return childModules as IModule[];
  }

  async create(module: IModule): Promise<IModule> {
    const { roleModules, childModules, parentModule, moduleType, ...moduleData } = module;

    const maxModuleId = await prisma.modules.findFirst({
      orderBy: {
        moduleId: 'desc',
      },
      select: {
        moduleId: true,
      },
    });

    const nextModuleId = (maxModuleId?.moduleId || 0) + 1;

    const createdModule = await prisma.modules.create({
      data: {
        ...moduleData,
        moduleId: nextModuleId,
      },
    });

    return createdModule as IModule;
  }

  async update(module: IModule): Promise<IModule> {
    const { roleModules, childModules, parentModule, moduleType, moduleId, ...moduleData } = module;

    const updatedModule = await prisma.modules.update({
      where: {
        moduleId: module.moduleId,
      },
      data: {
        ...moduleData,
      },
    });

    return updatedModule as IModule;
  }

  async softDelete(moduleId: number): Promise<IModule> {
    const deletedModule = await prisma.modules.update({
      where: {
        moduleId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedModule as IModule;
  }

  async restore(moduleId: number): Promise<IModule> {
    const restoredModule = await prisma.modules.update({
      where: {
        moduleId,
      },
      data: {
        deletedAt: null,
      },
    });

    return restoredModule as IModule;
  }

  async forceDelete(moduleId: number): Promise<IModule> {
    const forceDeletedModule = await prisma.modules.delete({
      where: {
        moduleId,
      },
    });

    return forceDeletedModule as IModule;
  }
}
