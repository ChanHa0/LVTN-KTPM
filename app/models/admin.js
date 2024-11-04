const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Admin', {
    aId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'A_ID'
    },
    aName: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'A_NAME'
    },
    aEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'A_EMAIL'
    },
    aRole: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'A_ROLE'
    }
  }, {
    sequelize,
    tableName: 'ADMIN',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_ADMIN",
        unique: true,
        fields: [
          { name: "A_ID" },
        ]
      },
    ]
  });
};
