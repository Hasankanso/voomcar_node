const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ride', {
    acAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    availableLuggages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    comment: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    kidSeat: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    leavingDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    map: {
      type: DataTypes.STRING(750),
      allowNull: true
    },
    maxLuggages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxSeats: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    musicAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    petsAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    smokingAllowed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    stopTime: {
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
    car: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'car',
        key: 'objectId'
      }
    },
    driver: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'driver',
        key: 'objectId'
      }
    },
    from: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'location',
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
    tableName: 'ride',
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
        name: "car",
        using: "BTREE",
        fields: [
          { name: "car" },
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
        name: "from",
        using: "BTREE",
        fields: [
          { name: "from" },
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
