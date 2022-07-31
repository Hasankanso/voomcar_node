const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('countryinformation', {
    code: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    countryComponent: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    digits: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    drivingAge: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    maxPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    minPrice: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    priceStep: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    rateStart: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    unit: {
      type: DataTypes.STRING(500),
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
    tableName: 'countryinformation',
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
        name: "unit",
        using: "BTREE",
        fields: [
          { name: "unit" },
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
