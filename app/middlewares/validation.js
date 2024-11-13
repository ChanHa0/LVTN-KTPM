const { body, validationResult } = require('express-validator');

const validateRegister = [
    body('uPhone').matches(/^[0-9]{10}$/).withMessage('Số điện thoại không hợp lệ'),
    body('uEmail').isEmail().withMessage('Email không hợp lệ'),
    body('uPassword').isLength({ min: 6 }).withMessage('Mật khẩu phải có ít nhất 6 ký tự'),
];

const validateProduct = [
    body('prTitle').notEmpty().withMessage('Tiêu đề không được để trống'),
    body('prPrice').isNumeric().withMessage('Giá phải là số'),
    body('prStockquanlity').isInt({ min: 0 }).withMessage('Số lượng phải là số nguyên dương'),
];

const validateCart = [
    body('uId').isInt().withMessage('ID người dùng không hợp lệ'),
    body('prId').isInt().withMessage('ID sản phẩm không hợp lệ'),
    body('quantity').isInt({ min: 1 }).withMessage('Số lượng phải lớn hơn 0')
];

const validateOrder = [
    body('oRecipientname').notEmpty().withMessage('Tên người nhận không được để trống'),
    body('oPhone').matches(/^[0-9]{10}$/).withMessage('Số điện thoại không hợp lệ'),
    body('oAddress').notEmpty().withMessage('Địa chỉ không được để trống'),
    body('oPaymentmethod').isIn(['cod', 'banking']).withMessage('Phương thức thanh toán không hợp lệ')
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: 'ERR',
            message: 'Dữ liệu không hợp lệ',
            errors: errors.array()
        });
    }
    next();
};

module.exports = {
    validateRegister,
    validateProduct,
    validateCart,
    validateOrder,
    validate
}; 