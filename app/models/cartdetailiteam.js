const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cartdetailiteam', {
    scId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'SHOPPINGCART',
        key: 'SC_ID'
      },
      field: 'SC_ID'
    },
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
    cdiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'CDI_ID'
    },
    cdiQuantity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'CDI_QUANTITY'
    },
    cdiTotalprice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      field: 'CDI_TOTALPRICE'
    }
  }, {
    sequelize,
    tableName: 'CARTDETAILITEAM',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "CARTDETAILITEAM_FK",
        fields: [
          { name: "B_ID" },
        ]
      },
      {
        name: "CARTDETAILITEAM2_FK",
        fields: [
          { name: "SC_ID" },
        ]
      },
      {
        name: "PK_CARTDETAILITEAM",
        unique: true,
        fields: [
          { name: "SC_ID" },
          { name: "B_ID" },
        ]
      },
    ]
  });
};
