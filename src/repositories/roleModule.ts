import { PrismaClient } from '@prisma/client';
import NotFoundError from '../exeptions/NotFoundError';
import { IRoleModules } from '../types/model';

const prisma = new PrismaClient();

export class RoleModuleRepository {
  async getRoleModuleById(roleModuleId: string): Promise<IRoleModules | null> {
    const roleModule = await prisma.roleModules.findUnique({
      where: { roleModuleId },
      include: {
        module: {
          include: {
            moduleType: true,
            childModules: {
              include: {
                roleModules: true,
              },
            },
            parentModule: true,
          },
        },
        role: true,
      },
    });
    return roleModule as IRoleModules;
  }
  async getRoleModuleByRoleAndModule(roleId: string, moduleId: number): Promise<IRoleModules | null> {
    const roleModule = await prisma.roleModules.findFirst({
      where: { roleId, moduleId },
      include: {
        module: {
          include: {
            moduleType: true,
            childModules: {
              include: {
                roleModules: true,
              },
            },
            parentModule: true,
          },
        },
        role: true,
      },
    });

    if (!roleModule) {
      return null;
    }

    return roleModule as IRoleModules;
  }

  async getRoleModulesByRoleId(roleId: string): Promise<IRoleModules[]> {
    const roleModules = await prisma.roleModules.findMany({
      where: { roleId },
      include: {
        module: {
          include: {
            moduleType: true,
            childModules: {
              include: {
                roleModules: true,
              },
            },
            parentModule: true,
          },
        },
        role: true,
      },
    });
    return roleModules as IRoleModules[];
  }

  async getRoleModulesByModuleId(moduleId: number): Promise<IRoleModules[]> {
    const roleModules = await prisma.roleModules.findMany({
      where: { moduleId },
      include: {
        module: {
          include: {
            moduleType: true,
            childModules: {
              include: {
                roleModules: true,
              },
            },
            parentModule: true,
          },
        },
        role: true,
      },
    });
    return roleModules as IRoleModules[];
  }

  async insertRoleModule(roleModuleData: Omit<IRoleModules, 'roleModuleId'>): Promise<IRoleModules> {
    const { role, module, ...roleModuleSchema } = roleModuleData;
    const roleModule = await prisma.roleModules.create({
      data: roleModuleSchema,
    });
    return roleModule as IRoleModules;
  }

  async updateRoleModule(roleModuleId: string, roleModuleData: Partial<IRoleModules>): Promise<IRoleModules> {
    const { role, module, ...roleModuleSchema } = roleModuleData;
    const updatedRoleModule = await prisma.roleModules.update({
      where: { roleModuleId },
      data: roleModuleSchema,
    });

    if (!updatedRoleModule) {
      throw new NotFoundError(`RoleModule with id ${roleModuleId} not found`);
    }

    return updatedRoleModule as IRoleModules;
  }

  async deleteRoleModule(roleModuleId: string): Promise<void> {
    await prisma.roleModules.delete({
      where: { roleModuleId },
    });
  }
}
