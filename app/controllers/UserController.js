const UserService = require('../services/UserService');

const UserController = {
    async createUser(req, res) {
        try {
            const result = await UserService.registerUser(req.body);
            if (result.status === 'ERR') {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async loginUser(req, res) {
        try {
            const result = await UserService.loginUser(req.body);
            if (result.status === 'ERR') {
                return res.status(400).json(result);
            }
            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService.updateUser(id, req.body);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(id);

            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },

    async getAllUsers(req, res) {
        try {
            const { page = 1, limit = 10 } = req.query;
            const result = await UserService.getAllUsers({ page, limit });

            res.json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
};

module.exports = UserController;