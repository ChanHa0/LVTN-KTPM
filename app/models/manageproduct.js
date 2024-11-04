const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Manageproduct', {
    aId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ADMIN',
        key: 'A_ID'
      },
      field: 'A_ID'
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
    mprId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MPR_ID'
    }
  }, {
    sequelize,
    tableName: 'MANAGEPRODUCT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "MANAGEPRODUCT_FK",
        fields: [
          { name: "A_ID" },
        ]
      },
      {
        name: "MANAGEPRODUCT2_FK",
        fields: [
          { name: "PR_ID" },
        ]
      },
      {
        name: "PK_MANAGEPRODUCT",
        unique: true,
        fields: [
          { name: "A_ID" },
          { name: "PR_ID" },
        ]
      },
    ]
  });
};
