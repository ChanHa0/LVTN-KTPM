const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer', {
    cId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'C_ID'
    },
    cName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'C_NAME'
    },
    cGender: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'C_GENDER'
    },
    cDateofbirth: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'C_DATEOFBIRTH'
    },
    cEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'C_EMAIL'
    },
    cPhonenumber: {
      type: DataTypes.STRING(11),
      allowNull: true,
      field: 'C_PHONENUMBER'
    },
    cAddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'C_ADDRESS'
    },
    cRole: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'C_ROLE'
    }
  }, {
    sequelize,
    tableName: 'CUSTOMER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_CUSTOMER",
        unique: true,
        fields: [
          { name: "C_ID" },
        ]
      },
    ]
  });
};
