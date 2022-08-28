const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    blUserLocale: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    oAuthIdentities: {
      type: DataTypes.JSON,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: "phone"
    },
    verificationCode: {
      type: DataTypes.STRING(100),
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
    person: {
      type: DataTypes.BLOB,
      allowNull: true,
      references: {
        model: 'person',
        key: 'objectId'
      }
    },
    bckls__userStatusId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    bckls__lastLogin: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users',
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
        name: "phone",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "email",
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "phone_2",
        using: "BTREE",
        fields: [
          { name: "phone" },
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
        name: "person",
        using: "BTREE",
        fields: [
          { name: "person" },
        ]
      },
    ]
  });
};
