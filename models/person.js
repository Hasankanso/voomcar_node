const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    bio: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    chattiness: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    gender: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(750),
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    token: {
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
    },
    countryInformations: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'countryinformation',
        key: 'objectId'
      }
    },
    statistics: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'userstatistics',
        key: 'objectId'
      },
      unique: "person_ibfk_3"
    }
  }, {
    sequelize,
    tableName: 'person',
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
        name: "statistics",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "statistics" },
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
        name: "countryInformations",
        using: "BTREE",
        fields: [
          { name: "countryInformations" },
        ]
      },
    ]
  });
};
