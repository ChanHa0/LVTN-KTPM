const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Review', {
    rId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'R_ID'
    },
    bId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'BOOK',
        key: 'B_ID'
      },
      field: 'B_ID'
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
      {
        name: "RELATIONSHIP_3_FK",
        fields: [
          { name: "B_ID" },
        ]
      },
    ]
  });
};
