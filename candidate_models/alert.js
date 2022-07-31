const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('alert', {
    leavingDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
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
    from: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'location',
        key: 'objectId'
      }
    },
    passenger: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'person',
        key: 'objectId'
      }
    },
    to: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'location',
        key: 'objectId'
      }
    }
  }, {
    sequelize,
    tableName: 'alert',
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
        name: "from",
        using: "BTREE",
        fields: [
          { name: "from" },
        ]
      },
      {
        name: "passenger",
        using: "BTREE",
        fields: [
          { name: "passenger" },
        ]
      },
      {
        name: "to",
        using: "BTREE",
        fields: [
          { name: "to" },
        ]
      },
    ]
  });
};
