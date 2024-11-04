const { executeQuery } = require('./sqlService')
const bcrypt = require('bcrypt')
const { generalAccessToken, generalRefreshToken } = require('./JwtService')
const DB = require('../models');
const User = DB.User;



const createUser = async (req, res) => {
    try {
        const { cName, cEmail, cPassword, cPhonenumber, cAddress } = req.body;

        // Validate input
        if (!cName || !cEmail || !cPassword) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Thiếu thông tin cần thiết'
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ where: { cEmail } });
        if (existingUser) {
            return res.status(400).json({
                status: 'ERR',
                message: 'Email đã tồn tại'
            });
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
};

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await executeQuery(`SELECT * FROM Users WHERE email = '${email}'`)
            if (checkUser.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                })
            } else {
                const comparePassword = brypt.compareSync(password, checkUser[0].password)
                if (!comparePassword) {
                    resolve({
                        status: 'ERR',
                        message: 'Mật khẩu không chính xác',
                    })
                } else {
                    const access_token = await generalAccessToken({
                        id: checkUser[0].id,
                        isAdmin: checkUser[0].isAdmin
                    })
                    const refresh_token = await generalRefreshToken({
                        id: checkUser[0].id,
                        isAdmin: checkUser[0].isAdmin
                    })
                    resolve({
                        status: 'OK',
                        message: 'Đăng nhập thành công',
                        access_token,
                        refresh_token
                    })
                }
            }
        } catch (e) {
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await executeQuery(`SELECT * FROM Users WHERE id = ${id}`)
            if (checkUser.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                })
            } else {
                let updateQuery = 'UPDATE Users SET '
                for (const key in data) {
                    if (key !== 'id') {
                        updateQuery += `${key} = '${data[key]}', `
                    }
                }
                updateQuery = updateQuery.slice(0, -2) // Xóa dấu phẩy cuối cùng
                updateQuery += ` WHERE id = ${id}`
                await executeQuery(updateQuery)
                resolve({
                    status: 'OK',
                    message: 'Cập nhật người dùng thành công',
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
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
        } catch (e) {
            reject(e)
        }
    })
}

const getallUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await executeQuery('SELECT * FROM Users')
            resolve({
                status: 'OK',
                message: 'Thành công',
                data: allUser
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getdetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await executeQuery(`SELECT * FROM Users WHERE id = ${id}`)
            if (user.length === 0) {
                resolve({
                    status: 'ERR',
                    message: 'Người dùng không tồn tại',
                })
            } else {
                resolve({
                    status: 'OK',
                    message: 'Thành công',
                    data: user[0]
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getallUser,
    getdetailUser
}