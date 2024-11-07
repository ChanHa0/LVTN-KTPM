const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    oId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'O_ID'
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
    cId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CART',
        key: 'C_ID'
      },
      field: 'C_ID'
    },
    oStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'O_STATUS'
    },
    oOrderdate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'O_ORDERDATE'
    },
    oTotalamount: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'O_TOTALAMOUNT'
    },
    oShippingaddress: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'O_SHIPPINGADDRESS'
    },
    oShippingmethod: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'O_SHIPPINGMETHOD'
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
          { name: "U_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_6_FK",
        fields: [
          { name: "C_ID" },
        ]
      },
    ]
  });
};
