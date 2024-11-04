const { UserService } = require('../services/UserService');
const { executeQuery } = require('../services/sqlService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/customer');


const UserController = {
    createUser: async (req, res) => {
        try {
            const { cName, cEmail, cPassword, cPhonenumber, cAddress } = req.body;

            // Kiểm tra email đã tồn tại
            const existingUser = await User.findOne({ where: { cEmail } });
            if (existingUser) {
                return res.status(400).json({
                    status: 'ERR',
                    message: 'Email đã tồn tại'
                });
            }

            // Mã hóa mật khẩu
            const hashedPassword = await bcrypt.hash(cPassword, 10);

            const user = await UserService.create({
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

            const user = await User.findOne({ where: { cEmail } });
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
            const user = await User.update(req.body);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteUser: async (req, res) => {
        try {
            const checkUser = await executeQuery(`SELECT * FROM Users WHERE id = ${id}`)
            if (checkUser.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                })
            } else {
                await executeQuery(`DELETE FROM Users WHERE id = ${id}`)
                resolve({
                    status: 'OK',
                    message: 'Xóa người dùng thành công'
                })
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllUsers: async (req, res) => {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getdetailUser: async (req, res) => {
        try {
            const user = await User.findByPk(req.params.id);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    refreshToken: async (req, res) => {
        try {
            const token = req.headers.token.split('')[1];
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