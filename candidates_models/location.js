const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    name: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    placeId: {
      type: DataTypes.STRING(250),
      allowNull: true,
      unique: "placeId"
    },
    position: {
      type: DataTypes.GEOMETRY,
      allowNull: true
    },
    objectId: {
      type: DataTypes.BLOB,
      allowNull: false,
      primaryKey: true
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
    tableName: 'location',
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
        name: "placeId",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "placeId" },
        ]
      },
      {
        name: "placeId_2",
        using: "BTREE",
        fields: [
          { name: "placeId" },
        ]
      },
    ]
  });
};
