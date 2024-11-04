const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Product', {
    prId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'PR_ID'
    },
    prTitle: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'PR_TITLE'
    },
    prAuthor: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'PR_AUTHOR'
    },
    prPublisher: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'PR_PUBLISHER'
    },
    prYearofpublication: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'PR_YEAROFPUBLICATION'
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
