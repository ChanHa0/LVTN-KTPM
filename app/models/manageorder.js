const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Manageorder', {
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
    oId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ORDER',
        key: 'O_ID'
      },
      field: 'O_ID'
    },
    moId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'MO_ID'
    }
  }, {
    sequelize,
    tableName: 'MANAGEORDER',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "MANAGEORDER_FK",
        fields: [
          { name: "A_ID" },
        ]
      },
      {
        name: "MANAGEORDER2_FK",
        fields: [
          { name: "O_ID" },
        ]
      },
      {
        name: "PK_MANAGEORDER",
        unique: true,
        fields: [
          { name: "A_ID" },
          { name: "O_ID" },
        ]
      },
    ]
  });
};
