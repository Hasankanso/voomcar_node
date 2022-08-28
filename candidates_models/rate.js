const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rate', {
    comment: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    grade: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    reason: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    objectId: {
      type: DataTypes.BLOB,
      allowNull: false,
      primaryKey: true
    },
    ownerId: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'users',
        key: 'objectId'
      }
    },
    created: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: true
    },
    rater: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'person',
        key: 'objectId'
      }
    },
    ride: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'ride',
        key: 'objectId'
      }
    },
    target: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'person',
        key: 'objectId'
      }
    }
  }, {
    sequelize,
    tableName: 'rate',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "objectId" },
        ]
      },
      {
        name: "ownerId",
        using: "BTREE",
        fields: [
          { name: "ownerId" },
        ]
      },
      {
        name: "rater",
        using: "BTREE",
        fields: [
          { name: "rater" },
        ]
      },
      {
        name: "ride",
        using: "BTREE",
        fields: [
          { name: "ride" },
        ]
      },
      {
        name: "target",
        using: "BTREE",
        fields: [
          { name: "target" },
        ]
      },
    ]
  });
};
