const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('car', {
    brand: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    color: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true
    },
    maxLuggage: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    maxSeats: {
      type: DataTypes.TINYINT,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING(750),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
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
    },
    user: {
      type: DataTypes.STRING(45),
      allowNull: true
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
        name: "objectId_UNIQUE",
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
