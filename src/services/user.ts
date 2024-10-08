import InvariantError from '../exeptions/InvariantError';
import NotFoundError from '../exeptions/NotFoundError';
import { UserRepository } from '../repositories/user';
import { RoleRepository } from '../repositories/role';
import { IUser } from '../types/model';
import bcrypt from 'bcrypt';

const userRepository = new UserRepository();
const roleRepository = new RoleRepository();

export class UserService {
  async getUsers() {
    return await userRepository.getAllUsers();
  }

  async getUserById(id: string) {
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new NotFoundError('User not found, please register first');
    }

    return user;
  }

  async getUserByEmail(email: string, findQuery: string) {
    const user = await userRepository.getUserByEmail(email);

    if (findQuery === 'not' && !user) {
      throw new NotFoundError('User not found, please register first');
    }

    if (findQuery === 'exist' && user) {
      throw new InvariantError('User already exist, please try another email');
    }

    return user;
  }

  async getUserByEmailOrUsername(identifier: string) {
    const user = await userRepository.getUserByEmailOrUsername(identifier);

    if (!user) {
      throw new NotFoundError('User not found, please register first');
    }

    return user;
  }

  async updateUser(user: IUser) {
    const userData = await userRepository.getUserById(user.userId);

    if (!userData) {
      throw new NotFoundError('User not found, please register first');
    }

    if (user.email && user.email !== userData.email) {
      const userExist = await userRepository.getUserByEmail(user.email);
      if (userExist) {
        throw new InvariantError('User already exists, please try another email');
      }
    }

    if (user.username && user.username !== userData.username) {
      const userExist = await userRepository.getUserByUsername(user.username);
      if (userExist) {
        throw new InvariantError('User already exists, please try another username');
      }
    }

    const updatedUser = await userRepository.update({
      ...userData,
      ...user,
    });

    return updatedUser;
  }

  async createUser(user: IUser) {
    if (user.email) {
      const userExist = await userRepository.getUserByEmail(user.email);
      if (userExist) {
        throw new InvariantError('User already exist, please try another email');
      }
    }

    if (user.username) {
      const userExist = await userRepository.getUserByUsername(user.username);
      if (userExist) {
        throw new InvariantError('User already exist, please try another username');
      }
    }

    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
    }

    const createdUser = await userRepository.create(user);
    return createdUser;
  }

  async softDeleteUsers(userIds: string[]) {
    for (const userId of userIds) {
      const userData = await userRepository.getUserById(userId);
      if (!userData) {
        throw new NotFoundError(`User with ID ${userId} not found, please register first`);
      }
      await userRepository.softDelete(userData.userId);
    }
  }

  async restoreUsers(userIds: string[]) {
    for (const userId of userIds) {
      const userData = await userRepository.getUserById(userId);
      if (!userData) {
        throw new NotFoundError(`User with ID ${userId} not found, please register first`);
      }
      await userRepository.restore(userData.userId);
    }
  }

  async forceDeleteUsers(userIds: string[]) {
    for (const userId of userIds) {
      const userData = await userRepository.getUserById(userId);
      if (!userData) {
        throw new NotFoundError(`User with ID ${userId} not found, please register first`);
      }
      await userRepository.forceDelete(userData.userId);
    }
  }
}
