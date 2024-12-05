const UserService = require('../services/UserService');

const UserController = {
    // Đăng ký người dùng
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
    // Đăng nhập người dùng
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
    // Cập nhật người dùng
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
    // Xóa người dùng
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
    // Lấy tất cả người dùng
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
    // Lấy chi tiết người dùng
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