const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('schedule', {
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    friday: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    monday: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    saturday: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sunday: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    thursday: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    tuesday: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    wednesday: {
      type: DataTypes.BOOLEAN,
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
    tableName: 'schedule',
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
