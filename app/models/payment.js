const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payment', {
    pId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'P_ID'
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
    oId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ORDER',
        key: 'O_ID'
      },
      field: 'O_ID'
    },
    pMethod: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'P_METHOD'
    },
    pStatus: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'P_STATUS'
    }
  }, {
    sequelize,
    tableName: 'PAYMENT',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_PAYMENT",
        unique: true,
        fields: [
          { name: "P_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_5_FK",
        fields: [
          { name: "U_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_7_FK",
        fields: [
          { name: "O_ID" },
        ]
      },
    ]
  });
};
