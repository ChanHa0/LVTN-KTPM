const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product', {
    prId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'PR_ID'
    },
    prTitle: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PR_TITLE'
    },
    prAuthor: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PR_AUTHOR'
    },
    prImage: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PR_IMAGE'
    },
    prDescription: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PR_DESCRIPTION'
    },
    prCategory: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'PR_CATEGORY'
    },
    prStockquanlity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'PR_STOCKQUANLITY'
    },
    prPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true,
      field: 'PR_PRICE'
    }
  }, {
    sequelize,
    tableName: 'PRODUCT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_PRODUCT",
        unique: true,
        fields: [
          { name: "PR_ID" },
        ]
      },
    ]
  });
};