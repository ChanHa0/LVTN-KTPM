const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orderdetail', {
    bId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BOOK',
        key: 'B_ID'
      },
      field: 'B_ID'
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
        name: "ORDERDETAIL_FK",
        fields: [
          { name: "O_ID" },
        ]
      },
      {
        name: "ORDERDETAIL2_FK",
        fields: [
          { name: "B_ID" },
        ]
      },
      {
        name: "PK_ORDERDETAIL",
        unique: true,
        fields: [
          { name: "B_ID" },
          { name: "O_ID" },
        ]
      },
    ]
  });
};
