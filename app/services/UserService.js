const { User } = require('../models');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const UserService = {
    registerUser: async (userData) => {
        let { uName, uEmail, uPassword, uAddress, uPhone, uIsadmin } = userData;
        try {
            // Kiểm tra xem email đã tồn tại hay chưa
            const existingUser = await UserService.findUserByEmail(uEmail);
            if (existingUser) {
                return { status: 'ERR', message: 'Email đã tồn tại' };
            }
            // Hash password trước khi lưu
            if (uPassword) {
                uPassword = await UserService.hashPassword(uPassword);
            }
            // Tạo người dùng mới
            const newUser = await User.create({
                uName,
                uPassword,
                uEmail,
                uAddress,
                uPhone,
                uIsadmin
            });
            // Đăng ký thành công
            return { status: 'OK', message: 'Đăng ký thành công', data: newUser };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi đăng ký', error: error.message };
        }
    },

    loginUser: async (userData) => {
        const { uEmail, uPassword } = userData;
        try {
            // Tìm người dùng theo email
            const user = await User.findOne({
                where: { uEmail: userData.uEmail }
            });
            // Kiểm tra xem người dùng có tồn tại không
            if (!user) {
                return { status: 'ERR', message: 'Email không tồn tại' };
            }
            // Kiểm tra xem user có password không
            if (!user.uPassword) {
                // Nếu user chưa có password (ví dụ: đăng nhập bằng Google)
                return {
                    status: 'OK',
                    message: 'Đăng nhập thành công',
                    data: {
                        user: {
                            id: user.uId,
                            name: user.uName,
                            email: user.uEmail,
                            role: user.uIsadmin
                        }
                    }
                };
            }
            // Nếu có password, thực hiện so sánh
            if (uPassword && user.uPassword) {
                const isValidPassword = await bcrypt.compare(uPassword, user.uPassword);
                if (!isValidPassword) {
                    return { status: 'ERR', message: 'Mật khẩu không chính xác' };
                }
            } else {
                return { status: 'ERR', message: 'Vui lòng nhập mật khẩu' };
            }
            // Tạo JWT token
            const token = jwt.sign(
                { id: user.uId, email: user.uEmail, role: user.uIsadmin },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '24h' }
            );
            // Đăng nhập thành công
            return {
                status: 'OK',
                message: 'Đăng nhập thành công',
                data: {
                    user: {
                        id: user.uId,
                        name: user.uName,
                        email: user.uEmail,
                        role: user.uIsadmin
                    },
                    token
                }
            };

        } catch (error) {
            return { status: 'ERR', message: 'Lỗi đăng nhập', error: error.message };
        }
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

    getAllUser: async (query) => {
        try {
            // Lấy các tham số truy vấn
            const { page = 1, limit = 10 } = query;
            const offset = (page - 1) * limit;

            // Lấy danh sách người dùng 
            const users = await User.findAndCountAll({
                offset: offset,
                limit: parseInt(limit),
                attributes: { exclude: ['uPassword'] }
            });
            return {
                status: 'OK',
                message: 'Lấy danh sách người dùng thành công',
                data: {
                    users: users.rows,
                    pagination: {
                        total: users.count,
                        page: parseInt(page),
                        limit: parseInt(limit),
                        totalPages: Math.ceil(users.count / limit)
                    }
                }
            };

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

    findUserByEmail: async (email) => {
        try {
            const user = await User.findOne({
                where: { uEmail: email }
            });
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    hashPassword: async (password) => {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }
};

module.exports = UserService;




