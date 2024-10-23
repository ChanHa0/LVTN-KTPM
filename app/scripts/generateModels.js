const SequelizeAuto = require('sequelize-auto');
const { sequelize } = require('../config/database');

const auto = new SequelizeAuto(sequelize, null, null, {
    directory: './app/models',
    caseFile: 'l',
    caseModel: 'p',
    caseProp: 'c',
    singularize: true,
    additional: {
        timestamps: false
    },
    tables: ['ADMIN', 'BOOK', 'BOOKCATEGORY', 'CARTDETAILITEAM', 'CATEGORY', 'CUSTOMER', 'MANAGEBOOK', 'MANAGECUSTOMER', 'MANAGEORDER', 'ORDER', 'ORDERDETAIL', 'PAYMENT', 'REVIEW', 'SHOPPINGCART'] // Thay thế bằng tên các bảng của bạn
});

auto.run().then(() => {
    console.log('Models generated successfully!');
}).catch((err) => {
    console.error('Error generating models:', err);
});