const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Managecustomer', {
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
    cId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'CUSTOMER',
        key: 'C_ID'
      },
      field: 'C_ID'
    },
    mcId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MC_ID'
    }
  }, {
    sequelize,
    tableName: 'MANAGECUSTOMER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "MANAGECUSTOMER_FK",
        fields: [
          { name: "C_ID" },
        ]
      },
      {
        name: "MANAGECUSTOMER2_FK",
        fields: [
          { name: "A_ID" },
        ]
      },
      {
        name: "PK_MANAGECUSTOMER",
        unique: true,
        fields: [
          { name: "A_ID" },
          { name: "C_ID" },
        ]
      },
    ]
  });
};
