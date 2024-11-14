const SequelizeAuto = require('sequelize-auto');
const { sequelize } = require('./connectDB');

const auto = new SequelizeAuto(sequelize, null, null, {
    directory: './app/models',
    caseFile: 'l',
    caseModel: 'p',
    caseProp: 'c',
    singularize: true,
    additional: {
        timestamps: false
    },
    tables: ['CART', 'CARTDETAIL', 'ORDER', 'ORDERDETAIL', 'PAYMENT', 'PRODUCT', 'USER']
});

auto.run().then(() => {
    console.log('Models generated successfully!');
}).catch((err) => {
    console.error('Error generating models:', err);
});