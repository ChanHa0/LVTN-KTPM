const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Shoppingcart', {
    scId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'SC_ID'
    },
    cId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CUSTOMER',
        key: 'C_ID'
      },
      field: 'C_ID'
    },
    scCreateddate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'SC_CREATEDDATE'
    }
  }, {
    sequelize,
    tableName: 'SHOPPINGCART',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_SHOPPINGCART",
        unique: true,
        fields: [
          { name: "SC_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_1_FK",
        fields: [
          { name: "C_ID" },
        ]
      },
    ]
  });
};
