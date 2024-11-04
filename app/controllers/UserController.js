const { UserService } = require('../services/UserService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserController = {
    createUser: async (req, res) => {
        try {
            const { cName, cEmail, cPassword, cPhonenumber, cAddress } = req.body;

            // Kiểm tra email đã tồn tại
            const existingUser = await UserService.findUserByEmail(cEmail);
            if (existingUser) {
                return res.status(400).json({
                    status: 'ERR',
                    message: 'Email đã tồn tại'
                });
            }
            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(cPassword, 10);

            const user = await UserService.createUser({
                cName,
                cEmail,
                cPassword: hashedPassword,
                cPhonenumber,
                cAddress,
                cRole: 'user'
            });

            res.status(201).json({
                status: 'OK',
                message: 'Tạo tài khoản thành công',
                data: user
            });
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },
    loginUser: async (req, res) => {
        try {
            const { cEmail, cPassword } = req.body;

            const user = await UserService.findUserByEmail(cEmail);
            if (!user) {
                return res.status(404).json({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại'
                });
            }

            const isValidPassword = await bcrypt.compare(cPassword, user.cPassword);
            if (!isValidPassword) {
                return res.status(401).json({
                    status: 'ERR',
                    message: 'Mật khẩu không chính xác'
                });
            }

            const accessToken = jwt.sign(
                { id: user.cId, role: user.cRole },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1h' }
            );

            res.json({
                status: 'OK',
                message: 'Đăng nhập thành công',
                data: {
                    user,
                    accessToken
                }
            });
        } catch (error) {
            res.status(500).json({
                status: 'ERR',
                message: 'Lỗi server',
                error: error.message
            });
        }
    },
    updateUser: async (req, res) => {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const result = await UserService.deleteUser(req.params.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getdetailUser: async (req, res) => {
        try {
            const user = await UserService.getUserDetail(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const token = req.headers.token.split(' ')[1];
            res.json(token);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getProfile: (req, res) => {
        res.json(req.user);
    },
    updateProfile: (req, res) => {
        res.json(req.user);
    }
};
module.exports = UserController;