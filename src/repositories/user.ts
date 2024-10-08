import { PrismaClient } from '@prisma/client';
import { IUser } from '../types/model';

const prisma = new PrismaClient();

export class UserRepository {
  async getAllUsers(): Promise<IUser[]> {
    const users = await prisma.users.findMany({
      include: {
        role: true,
        avatar: true,
      },
    });
    return users as IUser[];
  }

  async getUserById(id: string): Promise<IUser | null> {
    const user = await prisma.users.findUnique({
      where: {
        userId: id,
      },
      include: {
        role: true,
        avatar: true,
      },
    });

    return user as IUser;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    const user = await prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        role: true,
        avatar: true,
      },
    });

    return user as IUser;
  }

  async getUserByUsername(username: string): Promise<IUser | null> {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
      include: {
        role: true,
        avatar: true,
      },
    });

    return user as IUser;
  }

  async getUserByEmailOrUsername(identifier: string): Promise<IUser | null> {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      },
      include: {
        role: true,
        avatar: true,
      },
    });

    return user as IUser;
  }

  async save(user: IUser): Promise<IUser> {
    const { role, avatar, ...userData } = user;

    const savedUser = await prisma.users.update({
      where: {
        userId: user.userId,
      },
      data: {
        ...userData,
      },
    });

    return savedUser as IUser;
  }

  async create(user: IUser): Promise<IUser> {
    const { role, avatar, ...userData } = user;

    const createdUser = await prisma.users.create({
      data: {
        ...userData,
      },
    });

    return createdUser as IUser;
  }

  async update(user: IUser): Promise<IUser> {
    const updatedUser = await prisma.users.update({
      where: {
        userId: user.userId,
      },
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        phone: user.phone,
        address: user.address,
        avatarId: user.avatarId,
        roleId: user.roleId,
      },
    });

    return updatedUser as IUser;
  }

  async softDelete(userId: string): Promise<IUser> {
    const deletedUser = await prisma.users.update({
      where: {
        userId,
      },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedUser as IUser;
  }

  async restore(userId: string): Promise<IUser> {
    const restoredUser = await prisma.users.update({
      where: {
        userId,
      },
      data: {
        deletedAt: null,
      },
    });

    return restoredUser as IUser;
  }

  async forceDelete(userId: string): Promise<IUser> {
    const forceDeletedUser = await prisma.users.delete({
      where: {
        userId,
      },
    });

    return forceDeletedUser as IUser;
  }
}
