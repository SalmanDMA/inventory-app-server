import { PrismaClient } from '@prisma/client';
import { IModuleType } from '../types/model';

const prisma = new PrismaClient();

export class ModuleTypeRepository {
  async getAllModulesTypes(): Promise<IModuleType[]> {
    const modulesTypes = await prisma.modulesTypes.findMany({
      include: {
        modules: true,
      },
    });

    return modulesTypes as IModuleType[];
  }

  async getModuleTypeById(id: string): Promise<IModuleType | null> {
    const module = await prisma.modulesTypes.findUnique({
      where: {
        moduleTypeId: id,
      },
      include: {
        modules: true,
      },
    });

    return module as IModuleType;
  }

  async getModuleTypeByName(name: string): Promise<IModuleType | null> {
    const module = await prisma.modulesTypes.findUnique({
      where: {
        name,
      },
      include: {
        modules: true,
      },
    });

    return module as IModuleType;
  }

  async create(module: IModuleType): Promise<IModuleType> {
    const { modules, ...moduleTypeData } = module;

    const createdModule = await prisma.modulesTypes.create({
      data: {
        ...moduleTypeData,
      },
    });

    return createdModule as IModuleType;
  }

  async update(module: IModuleType): Promise<IModuleType> {
    const { modules, ...moduleTypeData } = module;

    const updatedModule = await prisma.modulesTypes.update({
      where: {
        moduleTypeId: module.moduleTypeId,
      },
      data: {
        ...moduleTypeData,
      },
    });

    return updatedModule as IModuleType;
  }

  async softDelete(moduleTypeId: string): Promise<IModuleType> {
    const deletedModule = await prisma.modulesTypes.update({
      where: {
        moduleTypeId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedModule as IModuleType;
  }

  async restore(moduleTypeId: string): Promise<IModuleType> {
    const restoredModule = await prisma.modulesTypes.update({
      where: {
        moduleTypeId,
      },
      data: {
        deletedAt: null,
      },
    });

    return restoredModule as IModuleType;
  }

  async forceDelete(moduleTypeId: string): Promise<IModuleType> {
    const forceDeletedModule = await prisma.modulesTypes.delete({
      where: {
        moduleTypeId,
      },
    });

    return forceDeletedModule as IModuleType;
  }
}
