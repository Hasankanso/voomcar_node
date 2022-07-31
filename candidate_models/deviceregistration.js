const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('deviceregistration', {
    channelName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    deviceId: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    deviceToken: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    expiration: {
      type: DataTypes.DATE,
      allowNull: true
    },
    operatingSystemName: {
      type: DataTypes.STRING(15),
      allowNull: false
    },
    operatingSystemVersion: {
      type: DataTypes.STRING(45),
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
    user: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'users',
        key: 'objectId'
      }
    }
  }, {
    sequelize,
    tableName: 'deviceregistration',
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
        name: "user",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
