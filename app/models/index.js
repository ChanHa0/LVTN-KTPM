const fs = require('fs');
const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const DB = {};

fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js' && file.slice(-3) === '.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, DataTypes);
        DB[model.name] = model;
    });

Object.keys(DB).forEach(modelName => {
    if (DB[modelName].associate) {
        DB[modelName].associate(DB);
    }
});

DB.sequelize = sequelize;
DB.Sequelize = Sequelize;

module.exports = DB;