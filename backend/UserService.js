import User from './user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserService {
    async register({ username, password }) {
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ username, password: hashPassword });
        return user;
    }

    async login({ username, password }) {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            throw new Error('User not found');
        }
        const isPassValid = await bcrypt.compare(password, user.password);
        if (!isPassValid) {
            throw new Error('Invalid password');
        }
        const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1h' });
        return { user, token };
    }

    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

    async verifyToken(token) {
        try {
            const decoded = jwt.verify(token, 'secret');
            const user = await User.findByPk(decoded.id);
            if (!user) {
                throw new Error('User not found');
            }
            return user;
        } catch (e) {
            throw new Error('Invalid token');
        }
    }
}

export default new UserService();