import { PrismaClient } from '@prisma/client';
import { IRole } from '../types/model';

const prisma = new PrismaClient();

export class RoleRepository {
  async getAllRoles(): Promise<IRole[]> {
    const roles = await prisma.roles.findMany({
      include: {
        roleModules: true,
      },
    });

    return roles as IRole[];
  }

  async getRoleById(id: string): Promise<IRole | null> {
    const role = await prisma.roles.findUnique({
      where: {
        roleId: id,
      },
      include: {
        roleModules: true,
      },
    });

    return role as IRole;
  }

  async getRoleByName(name: string): Promise<IRole | null> {
    const role = await prisma.roles.findUnique({
      where: {
        name,
      },
      include: {
        roleModules: true,
      },
    });

    return role as IRole;
  }

  async create(role: IRole): Promise<IRole> {
    const { roleModules, users, ...roleData } = role;

    const createdRole = await prisma.roles.create({
      data: {
        ...roleData,
      },
    });

    return createdRole as IRole;
  }

  async update(role: IRole): Promise<IRole> {
    const { roleModules, users, ...roleData } = role;

    const updatedRole = await prisma.roles.update({
      where: {
        roleId: role.roleId,
      },
      data: {
        ...roleData,
      },
    });

    return updatedRole as IRole;
  }

  async softDelete(roleId: string): Promise<IRole> {
    const deletedRole = await prisma.roles.update({
      where: {
        roleId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedRole as IRole;
  }

  async restore(roleId: string): Promise<IRole> {
    const restoredRole = await prisma.roles.update({
      where: {
        roleId,
      },
      data: {
        deletedAt: null,
      },
    });

    return restoredRole as IRole;
  }

  async forceDelete(roleId: string): Promise<IRole> {
    const forceDeletedRole = await prisma.roles.delete({
      where: {
        roleId,
      },
    });

    return forceDeletedRole as IRole;
  }
}
