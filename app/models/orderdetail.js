const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orderdetail', {
    prId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'PRODUCT',
        key: 'PR_ID'
      },
      field: 'PR_ID'
    },
    oId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ORDER',
        key: 'O_ID'
      },
      field: 'O_ID'
    },
    odId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'OD_ID'
    },
    odQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'OD_QUANTITY'
    },
    odPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      field: 'OD_PRICE'
    }
  }, {
    sequelize,
    tableName: 'ORDERDETAIL',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "ORDERDETAIL2_FK",
        fields: [
          { name: "O_ID" },
        ]
      },
      {
        name: "PK_ORDERDETAIL",
        unique: true,
        fields: [
          { name: "PR_ID" },
          { name: "O_ID" },
        ]
      },
    ]
  });
};
