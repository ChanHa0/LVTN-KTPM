const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('User', {
    uId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'U_ID'
    },
    uName: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'U_NAME'
    },
    uPassword: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'U_PASSWORD'
    },
    uEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'U_EMAIL'
    },
    uAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'U_ADDRESS'
    },
    uPhone: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'U_PHONE'
    },
    uIsadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'U_ISADMIN'
    }
  }, {
    sequelize,
    tableName: 'USER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_USER",
        unique: true,
        fields: [
          { name: "U_ID" },
        ]
      },
    ]
  });
};
