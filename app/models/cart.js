const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Cart', {
    cId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'C_ID'
    },
    uId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'USER',
        key: 'U_ID'
      },
      field: 'U_ID'
    },
    cStatus: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'C_STATUS'
    }
  }, {
    sequelize,
    tableName: 'CART',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_CART",
        unique: true,
        fields: [
          { name: "C_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_1_FK",
        fields: [
          { name: "U_ID" },
        ]
      },
    ]
  });
};
