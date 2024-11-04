const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Productcategory', {
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
    prcId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'PRC_ID'
    }
  }, {
    sequelize,
    tableName: 'PRODUCTCATEGORY',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_PRODUCTCATEGORY",
        unique: true,
        fields: [
          { name: "PR_ID" },
          { name: "CG_CATEGORYID_" },
        ]
      },
      {
        name: "PRODUCTCATEGORY_FK",
        fields: [
          { name: "PR_ID" },
        ]
      },
      {
        name: "PRODUCTCATEGORY2_FK",
        fields: [
          { name: "CG_CATEGORYID_" },
        ]
      },
    ]
  });
};
