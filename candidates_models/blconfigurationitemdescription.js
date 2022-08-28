const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('blconfigurationitemdescription', {
    defaultValue: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    displayName: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    hint: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    localServiceVersion: {
      type: DataTypes.BLOB,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    options: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    order: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    required: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(250),
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
    tableName: 'blconfigurationitemdescription',
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
