const UserService = require('../services/UserService');

const UserController = {
    // Register user
    registerUser: async (req, res) => {
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
    // Login user
    loginUser: async (req, res) => {
        try {
            const result = await UserService.loginUser(req.body);
            if (result.status === 'ERR') {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Update user
    updateUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await UserService.updateUser(id, req.body);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Delete user
    deleteUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await UserService.deleteUser(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Get all user
    getAllUsers: async (req, res) => {
        try {
            const result = await UserService.getAllUsers();
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
    // Get detail user
    getDetailUser: async (req, res) => {
        try {
            const { id } = req.params;
            const result = await UserService.getDetailUser(id);
            if (result.status === 'ERR') {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ status: 'ERR', message: 'Lỗi server', error: error.message });
        }
    },
};

module.exports = UserController;