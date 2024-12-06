import UserService from './UserService.js';

class UserController {
    async register(req, res) {
        try {
            const user = await UserService.register(req.body);
            res.status(200).json(user);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async login(req, res) {
        try {
            const { user, token } = await UserService.login(req.body);
            res.status(200).json({ user, token });
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async logout(req, res) {
        res.clearCookie('token');
        res.status(200).json({ message: 'Logged out' });
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e.message);
        }
    }

    async verifyToken(req, res) {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const user = await UserService.verifyToken(token);
            res.status(200).json({ user });
        } catch (e) {
            res.status(401).json(e.message);
        }
    }
}

export default new UserController();