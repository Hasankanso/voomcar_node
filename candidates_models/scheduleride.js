const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('scheduleride', {
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
    driver: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'driver',
        key: 'objectId'
      }
    },
    schedule: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'schedule',
        key: 'objectId'
      }
    }
  }, {
    sequelize,
    tableName: 'scheduleride',
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
        name: "driver",
        using: "BTREE",
        fields: [
          { name: "driver" },
        ]
      },
      {
        name: "schedule",
        using: "BTREE",
        fields: [
          { name: "schedule" },
        ]
      },
    ]
  });
};
