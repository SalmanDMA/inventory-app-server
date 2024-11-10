import bcrypt from 'bcrypt';
import { UserService } from '../services/user';
import { UserRepository } from '../repositories/user';
import AuthenticationError from '../exeptions/AuthenticationError';
import { generateToken, IGenerateToken } from '../utils/tokenize';
import NotFoundError from '../exeptions/NotFoundError';

const userRepository = new UserRepository();
const userService = new UserService();

const handleSignIn = async (identifier: string, password: string) => {
	const user = await userService.getUserByEmailOrUsername(identifier);

	if (!user || !user.password) {
		throw new NotFoundError('User not found or password missing, please register first');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new AuthenticationError('Invalid password, please try again.');
	}

	const expiresIn = 24 * 60 * 60;

	const token = generateToken({
		payload: { id: user.userId, name: user.name, roleId: user.role.roleId, roleName: user.role.name },
		expiresIn: expiresIn,
	} as IGenerateToken);

	const { password: _, ...userWithoutPassword } = user;

	const userSend = {
		user: userWithoutPassword,
		token,
		expiresIn,
	};

	return userSend;
};

const handleChangePassword = async (userId: string, oldPassword: string, newPassword: string) => {
	const user = await userService.getUserById(userId);

	if (!user || !user.password) {
		throw new NotFoundError('User not found or password missing, please register first');
	}

	const isOldPasswordMatch = await bcrypt.compare(oldPassword, user.password);

	if (!isOldPasswordMatch) {
		throw new AuthenticationError('Invalid old password.');
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	user.password = hashedPassword;

	await userRepository.save(user);

	return user;
};

const handleForgotPassword = async (identifier: string, newPassword: string) => {
	const user = await userService.getUserByEmailOrUsername(identifier);

	if (!user) {
		throw new NotFoundError('User not found, please register first');
	}

	const hashedPassword = await bcrypt.hash(newPassword, 10);

	user.password = hashedPassword;

	await userRepository.save(user);
	return user;
};

export { handleSignIn, handleChangePassword, handleForgotPassword };
