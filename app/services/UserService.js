const { User } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const UserService = {
    registerUser: async (userData) => {
        const { uName, uEmail, uPassword } = userData;
        try {
            // Kiểm tra email tồn tại
            const existingUser = await User.findOne({ where: { uEmail: uEmail } });
            if (existingUser) {
                return { status: 'ERR', message: 'Email đã được sử dụng' };
            };
            // Hash password
            const hashedPassword = await bcrypt.hash(uPassword, 10);
            // Tạo user mới
            const newUser = await User.create({
                uName,
                uEmail,
                uPassword: hashedPassword,
                uIsadmin: false,
            });
            return { status: 'OK', message: 'Đăng ký thành công', data: newUser };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi đăng ký người dùng', error: error.message };
        };
    },

    updateUser: async (id, userData) => {
        try {
            // Tìm người dùng theo id
            const user = await User.findByPk(id);
            if (!user) {
                return { status: 'ERR', message: 'Không tìm thấy người dùng' };
            }
            // Nếu có password mới thì hash password
            if (userData.uPassword) {
                userData.uPassword = await bcrypt.hash(userData.uPassword, 10);
            }
            // Cập nhật thông tin người dùng
            await user.update(userData);
            // Cập nhật thành công
            return { status: 'OK', message: 'Cập nhật thông tin thành công', data: user };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi cập nhật thông tin', error: error.message };
        };
    },

    deleteUser: async (id) => {
        try {
            // Tìm người dùng theo id
            const user = await User.findByPk(id);
            if (!user) {
                return { status: 'ERR', message: 'Không tìm thấy người dùng' };
            }
            // Xóa người dùng
            await user.destroy();
            return { status: 'OK', message: 'Xóa người dùng thành công' };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi xóa người dùng', error: error.message };
        };
    },

    getAllUser: async () => {
        try {

            // Lấy danh sách người dùng 
            const user = await User.findAll();
            return { status: 'OK', message: 'Lấy danh sách người dùng thành công', data: user };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy danh sách người dùng', error: error.message };
        };
    },

    getDetailUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                return { status: 'ERR', message: 'Không tìm thấy người dùng' };
            }
            return { status: 'OK', message: 'Lấy chi tiết người dùng thành công', data: user };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi lấy chi tiết người dùng', error: error.message };
        };
    },

    loginUser: async (userData) => {
        try {
            const { uEmail, uPassword } = userData;
            const user = await User.findOne({ where: { uEmail: uEmail } });

            if (!user) {
                return { status: 'ERR', message: 'Email không tồn tại' };
            }

            const isMatch = await bcrypt.compare(uPassword, user.uPassword);
            if (!isMatch) {
                return { status: 'ERR', message: 'Mật khẩu không đúng' };
            }

            const token = jwt.sign(
                {
                    id: user.uId,
                    email: user.uEmail,
                    role: user.uIsadmin
                },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );
            return { status: 'OK', message: 'Đăng nhập thành công', data: { token, user } };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi đăng nhập', error: error.message };
        };
    },
};

module.exports = UserService;




