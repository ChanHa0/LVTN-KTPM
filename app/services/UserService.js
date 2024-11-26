const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const UserService = {
    registerUser: async (userData) => {
        const { uName, uEmail, uPassword, uAddress, uPhone } = userData;
        try {
            // Kiểm tra email tồn tại
            const existingUser = await User.findOne({ uEmail });
            if (existingUser) {
                return { status: 'ERR', message: 'Email đã được sử dụng' };
            }
            // Hash password
            const hashedPassword = await bcrypt.hash(uPassword, 10);
            // Tạo user mới
            const newUser = await User.create({
                uName,
                uEmail,
                uPassword: hashedPassword,
                uAddress,
                uPhone,
                uRole: 'USER',
            });
            return { status: 'OK', message: 'Đăng ký thành công', data: newUser };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi đăng ký người dùng', error: error.message };
        }
    },

    updateUser: async (id, userData) => {
        try {
            // Tìm người dùng theo id
            const user = await User.findById(id);
            if (!user) {
                return { status: 'ERR', message: 'Không tìm thấy người dùng' };
            }
            // Nếu có password mới thì hash password
            if (userData.uPassword) {
                userData.uPassword = await bcrypt.hash(userData.uPassword, 10);
            }
            // Cập nhật thông tin người dùng
            Object.assign(user, userData);
            await user.save();
            return { status: 'OK', message: 'Cập nhật thông tin thành công', data: user };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi cập nhật thông tin', error: error.message };
        }
    },

    deleteUser: async (id) => {
        try {
            // Tìm người dùng theo id
            const user = await User.findById(id);
            if (!user) {
                return { status: 'ERR', message: 'Không tìm thấy người dùng' };
            }
            // Xóa người dùng
            await User.findByIdAndDelete(id);
            return { status: 'OK', message: 'Xóa người dùng thành công' };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi xóa người dùng', error: error.message };
        }
    },

    getAllUser: async () => {
        try {
            // Lấy danh sách người dùng
            const users = await User.find();
            return { status: 'OK', message: 'Lấy danh sách người dùng thành công', data: users };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy danh sách người dùng', error: error.message };
        }
    },

    getDetailUser: async (id) => {
        try {
            const user = await User.findById(id);
            if (!user) {
                return { status: 'ERR', message: 'Không tìm thấy người dùng' };
            }
            return { status: 'OK', message: 'Lấy chi tiết người dùng thành công', data: user };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy chi tiết người dùng', error: error.message };
        }
    },

    loginUser: async (userData) => {
        try {
            const { uEmail, uPassword } = userData;
            const user = await User.findOne({ uEmail });

            if (!user) {
                return { status: 'ERR', message: 'Email không tồn tại' };
            }

            const isMatch = await bcrypt.compare(uPassword, user.uPassword);
            if (!isMatch) {
                return { status: 'ERR', message: 'Mật khẩu không đúng' };
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    email: user.uEmail,
                    role: user.uRole
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );
            return { status: 'OK', message: 'Đăng nhập thành công', data: { token, user } };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi đăng nhập', error: error.message };
        }
    },
};

module.exports = UserService;




