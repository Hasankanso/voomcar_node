const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('driver', {
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
    person: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'person',
        key: 'objectId'
      }
    },
    region1: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'location',
        key: 'objectId'
      }
    },
    region2: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'location',
        key: 'objectId'
      }
    },
    region3: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'location',
        key: 'objectId'
      }
    }
  }, {
    sequelize,
    tableName: 'driver',
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
        name: "person",
        using: "BTREE",
        fields: [
          { name: "person" },
        ]
      },
      {
        name: "region1",
        using: "BTREE",
        fields: [
          { name: "region1" },
        ]
      },
      {
        name: "region2",
        using: "BTREE",
        fields: [
          { name: "region2" },
        ]
      },
      {
        name: "region3",
        using: "BTREE",
        fields: [
          { name: "region3" },
        ]
      },
    ]
  });
};
