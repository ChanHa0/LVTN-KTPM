const bcrypt = require('bcrypt');
const { generalAccessToken, generalRefreshToken } = require('./JwtService');
const DB = require('../models');
const User = DB.User;

const createUser = async (userData) => {
    try {
        const { cName, cEmail, cPassword, cPhonenumber, cAddress } = userData;

        // Validate input
        if (!cName || !cEmail || !cPassword) {
            return {
                status: 'ERR',
                message: 'Thiếu thông tin cần thiết'
            };
        }

        // Check if email already exists
        const existingUser = await User.findOne({ where: { cEmail } });
        if (existingUser) {
            return {
                status: 'ERR',
                message: 'Email đã tồn tại'
            };
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(cPassword, 10);

        // Create user
        const user = await User.create({
            cName,
            cEmail,
            cPassword: hashedPassword,
            cPhonenumber,
            cAddress,
            cRole: 'user'
        });

        return {
            status: 'OK',
            message: 'Tạo tài khoản thành công',
            data: user
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const loginUser = async (userLogin) => {
    const { email, password } = userLogin;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return {
                status: 'ERR',
                message: 'Người dùng không tồn tại',
            };
        }

        const comparePassword = bcrypt.compareSync(password, user.cPassword);
        if (!comparePassword) {
            return {
                status: 'ERR',
                message: 'Mật khẩu không chính xác',
            };
        }

        const access_token = await generalAccessToken({
            id: user.id,
            isAdmin: user.isAdmin
        });
        const refresh_token = await generalRefreshToken({
            id: user.id,
            isAdmin: user.isAdmin
        });

        return {
            status: 'OK',
            message: 'Đăng nhập thành công',
            access_token,
            refresh_token
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const updateUser = async (id, data) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                status: 'ERR',
                message: 'Người dùng không tồn tại',
            };
        }

        await user.update(data);
        return {
            status: 'OK',
            message: 'Cập nhật người dùng thành công',
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                status: 'ERR',
                message: 'Người dùng không tồn tại',
            };
        }

        await user.destroy();
        return {
            status: 'OK',
            message: 'Xóa người dùng thành công'
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.findAll();
        return {
            status: 'OK',
            message: 'Thành công',
            data: users
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

const getDetailUser = async (id) => {
    try {
        const user = await User.findByPk(id);
        if (!user) {
            return {
                status: 'ERR',
                message: 'Người dùng không tồn tại',
            };
        }

        return {
            status: 'OK',
            message: 'Thành công',
            data: user
        };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUsers,
    getDetailUser
};