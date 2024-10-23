const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Category', {
    cgCategoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'CG_CATEGORYID_'
    },
    cgCategoryname: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'CG_CATEGORYNAME'
    }
  }, {
    sequelize,
    tableName: 'CATEGORY',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_CATEGORY",
        unique: true,
        fields: [
          { name: "CG_CATEGORYID_" },
        ]
      },
    ]
  });
};
