const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('Book', {
    bId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'B_ID'
    },
    bTitle: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'B_TITLE'
    },
    bAuthor: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'B_AUTHOR'
    },
    bPublisher: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'B_PUBLISHER'
    },
    bYearofpublication: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'B_YEAROFPUBLICATION'
    },
    bStockquanlity: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'B_STOCKQUANLITY'
    },
    bPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      field: 'B_PRICE'
    }
  }, {
    sequelize,
    tableName: 'BOOK',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_BOOK",
        unique: true,
        fields: [
          { name: "B_ID" },
        ]
      },
    ]
  });
};
