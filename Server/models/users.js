"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {}
  Users.init(
    {
      aspectNames: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      emailNotificationsEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      googleId: DataTypes.STRING,
      instantMessageId: DataTypes.STRING,
      jobTitle: DataTypes.STRING,
      lastName: DataTypes.STRING,
      location: DataTypes.STRING,
      mobile: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      propertiy_id: DataTypes.INTEGER,
      skypeId: DataTypes.STRING,
      telephone: DataTypes.STRING,
      userStatus: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
