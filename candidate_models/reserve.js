const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reserve', {
    luggages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(250),
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
    person: {
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
    }
  }, {
    sequelize,
    tableName: 'reserve',
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
        name: "ride",
        using: "BTREE",
        fields: [
          { name: "ride" },
        ]
      },
    ]
  });
};
