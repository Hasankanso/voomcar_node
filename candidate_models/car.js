const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car', {
    brand: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    color: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxLuggage: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxSeats: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    year: {
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
    driver: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'driver',
        key: 'objectId'
      }
    }
  }, {
    sequelize,
    tableName: 'car',
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
    ]
  });
};
