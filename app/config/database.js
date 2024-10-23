const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('DB', 'sa', '1234', {
    dialect: 'mssql',
    host: 'localhost',
    dialectOptions: {
        options: {
            instanceName: 'SQLEXPRESS'
        },
    },
});

module.exports = { sequelize, Sequelize };