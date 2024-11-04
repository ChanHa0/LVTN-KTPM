const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Review', {
    rId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'R_ID'
    },
    prId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'PRODUCT',
        key: 'PR_ID'
      },
      field: 'PR_ID'
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
    rRating: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'R_RATING'
    },
    rComment: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'R_COMMENT'
    },
    rReviewdate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'R_REVIEWDATE'
    }
  }, {
    sequelize,
    tableName: 'REVIEW',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK_REVIEW",
        unique: true,
        fields: [
          { name: "R_ID" },
        ]
      },
      {
        name: "RELATIONSHIP_2_FK",
        fields: [
          { name: "C_ID" },
        ]
      },
    ]
  });
};
