const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cartdetail', {
    cId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CART',
        key: 'C_ID'
      },
      field: 'C_ID'
    },
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
    cdId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'CD_ID'
    },
    cdQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'CD_QUANTITY'
    },
    cdTotalprice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      field: 'CD_TOTALPRICE'
    }
  }, {
    sequelize,
    tableName: 'CARTDETAIL',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "CARTDETAIL_FK",
        fields: [
          { name: "C_ID" },
        ]
      },
      {
        name: "CARTDETAIL2_FK",
        fields: [
          { name: "PR_ID" },
        ]
      },
      {
        name: "PK_CARTDETAIL",
        unique: true,
        fields: [
          { name: "C_ID" },
          { name: "PR_ID" },
        ]
      },
    ]
  });
};
