const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userstatistics', {
    acomplishedRides: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    canceledRides: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fives: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    fours: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ones: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rateAverage: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    ratesCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    threes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    twos: {
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
    }
  }, {
    sequelize,
    tableName: 'userstatistics',
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
    ]
  });
};
