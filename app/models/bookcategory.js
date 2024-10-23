const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Bookcategory', {
    bId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BOOK',
        key: 'B_ID'
      },
      field: 'B_ID'
    },
    cgCategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CATEGORY',
        key: 'CG_CATEGORYID_'
      },
      field: 'CG_CATEGORYID_'
    },
    bcId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'BC_ID'
    }
  }, {
    sequelize,
    tableName: 'BOOKCATEGORY',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "BOOKCATEGORY_FK",
        fields: [
          { name: "CG_CATEGORYID_" },
        ]
      },
      {
        name: "BOOKCATEGORY2_FK",
        fields: [
          { name: "B_ID" },
        ]
      },
      {
        name: "PK_BOOKCATEGORY",
        unique: true,
        fields: [
          { name: "CG_CATEGORYID_" },
          { name: "BC_ID" },
        ]
      },
    ]
  });
};
