const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    oId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'O_ID'
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
    scId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'SHOPPINGCART',
        key: 'SC_ID'
      },
      field: 'SC_ID'
    },
    oOrderdate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'O_ORDERDATE'
    },
    oTotalamount: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'O_TOTALAMOUNT'
    },
    oStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'O_STATUS'
    }
  }, {
    sequelize,
    tableName: 'ORDER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_ORDER",
        unique: true,
        fields: [
          { name: "O_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_4_FK",
        fields: [
          { name: "C_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_6_FK",
        fields: [
          { name: "SC_ID" },
        ]
      },
    ]
  });
};
