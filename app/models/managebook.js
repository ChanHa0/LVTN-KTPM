const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Managebook', {
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
    bId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'BOOK',
        key: 'B_ID'
      },
      field: 'B_ID'
    },
    mbId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MB_ID'
    }
  }, {
    sequelize,
    tableName: 'MANAGEBOOK',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "MANAGEBOOK_FK",
        fields: [
          { name: "B_ID" },
        ]
      },
      {
        name: "MANAGEBOOK2_FK",
        fields: [
          { name: "A_ID" },
        ]
      },
      {
        name: "PK_MANAGEBOOK",
        unique: true,
        fields: [
          { name: "A_ID" },
          { name: "B_ID" },
        ]
      },
    ]
  });
};
