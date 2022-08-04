var DataTypes = require("sequelize").DataTypes;
var _alert = require("./alert");
var _blconfigurationitemdescription = require("./blconfigurationitemdescription");
var _car = require("./car");
var _countryinformation = require("./countryinformation");
var _deviceregistration = require("./deviceregistration");
var _driver = require("./driver");
var _location = require("./location");
var _loggers = require("./loggers");
var _person = require("./person");
var _rate = require("./rate");
var _reserve = require("./reserve");
var _ride = require("./ride");
var _schedule = require("./schedule");
var _scheduleride = require("./scheduleride");
var _users = require("./users");
var _userstatistics = require("./userstatistics");

function initModels(sequelize) {
  var alert = _alert(sequelize, DataTypes);
  var blconfigurationitemdescription = _blconfigurationitemdescription(sequelize, DataTypes);
  var car = _car(sequelize, DataTypes);
  var countryinformation = _countryinformation(sequelize, DataTypes);
  var deviceregistration = _deviceregistration(sequelize, DataTypes);
  var driver = _driver(sequelize, DataTypes);
  var location = _location(sequelize, DataTypes);
  var loggers = _loggers(sequelize, DataTypes);
  var person = _person(sequelize, DataTypes);
  var rate = _rate(sequelize, DataTypes);
  var reserve = _reserve(sequelize, DataTypes);
  var ride = _ride(sequelize, DataTypes);
  var schedule = _schedule(sequelize, DataTypes);
  var scheduleride = _scheduleride(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var userstatistics = _userstatistics(sequelize, DataTypes);

  ride.belongsTo(car, { as: "car_car", foreignKey: "car"});
  car.hasMany(ride, { as: "rides", foreignKey: "car"});
  person.belongsTo(countryinformation, { as: "countryInformations_countryinformation", foreignKey: "countryInformations"});
  countryinformation.hasMany(person, { as: "people", foreignKey: "countryInformations"});
  car.belongsTo(driver, { as: "driver_driver", foreignKey: "driver"});
  driver.hasMany(car, { as: "cars", foreignKey: "driver"});
  ride.belongsTo(driver, { as: "driver_driver", foreignKey: "driver"});
  driver.hasMany(ride, { as: "rides", foreignKey: "driver"});
  scheduleride.belongsTo(driver, { as: "driver_driver", foreignKey: "driver"});
  driver.hasMany(scheduleride, { as: "schedulerides", foreignKey: "driver"});
  alert.belongsTo(location, { as: "from_location", foreignKey: "from"});
  location.hasMany(alert, { as: "alerts", foreignKey: "from"});
  alert.belongsTo(location, { as: "to_location", foreignKey: "to"});
  location.hasMany(alert, { as: "to_alerts", foreignKey: "to"});
  driver.belongsTo(location, { as: "region1_location", foreignKey: "region1"});
  location.hasMany(driver, { as: "drivers", foreignKey: "region1"});
  driver.belongsTo(location, { as: "region2_location", foreignKey: "region2"});
  location.hasMany(driver, { as: "region2_drivers", foreignKey: "region2"});
  driver.belongsTo(location, { as: "region3_location", foreignKey: "region3"});
  location.hasMany(driver, { as: "region3_drivers", foreignKey: "region3"});
  ride.belongsTo(location, { as: "from_location", foreignKey: "from"});
  location.hasMany(ride, { as: "rides", foreignKey: "from"});
  ride.belongsTo(location, { as: "to_location", foreignKey: "to"});
  location.hasMany(ride, { as: "to_rides", foreignKey: "to"});
  alert.belongsTo(person, { as: "passenger_person", foreignKey: "passenger"});
  person.hasMany(alert, { as: "alerts", foreignKey: "passenger"});
  driver.belongsTo(person, { as: "person_person", foreignKey: "person"});
  person.hasMany(driver, { as: "drivers", foreignKey: "person"});
  rate.belongsTo(person, { as: "rater_person", foreignKey: "rater"});
  person.hasMany(rate, { as: "rates", foreignKey: "rater"});
  rate.belongsTo(person, { as: "target_person", foreignKey: "target"});
  person.hasMany(rate, { as: "target_rates", foreignKey: "target"});
  reserve.belongsTo(person, { as: "person_person", foreignKey: "person"});
  person.hasMany(reserve, { as: "reserves", foreignKey: "person"});
  users.belongsTo(person, { as: "person_person", foreignKey: "person"});
  person.hasMany(users, { as: "users", foreignKey: "person"});
  rate.belongsTo(ride, { as: "ride_ride", foreignKey: "ride"});
  ride.hasMany(rate, { as: "rates", foreignKey: "ride"});
  reserve.belongsTo(ride, { as: "ride_ride", foreignKey: "ride"});
  ride.hasMany(reserve, { as: "reserves", foreignKey: "ride"});
  scheduleride.belongsTo(schedule, { as: "schedule_schedule", foreignKey: "schedule"});
  schedule.hasMany(scheduleride, { as: "schedulerides", foreignKey: "schedule"});
  alert.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(alert, { as: "alerts", foreignKey: "ownerId"});
  blconfigurationitemdescription.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(blconfigurationitemdescription, { as: "blconfigurationitemdescriptions", foreignKey: "ownerId"});
  car.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(car, { as: "cars", foreignKey: "ownerId"});
  countryinformation.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(countryinformation, { as: "countryinformations", foreignKey: "ownerId"});
  deviceregistration.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(deviceregistration, { as: "deviceregistrations", foreignKey: "ownerId"});
  deviceregistration.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(deviceregistration, { as: "user_deviceregistrations", foreignKey: "user"});
  driver.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(driver, { as: "drivers", foreignKey: "ownerId"});
  location.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(location, { as: "locations", foreignKey: "ownerId"});
  loggers.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(loggers, { as: "loggers", foreignKey: "ownerId"});
  person.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(person, { as: "people", foreignKey: "ownerId"});
  rate.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(rate, { as: "rates", foreignKey: "ownerId"});
  reserve.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(reserve, { as: "reserves", foreignKey: "ownerId"});
  ride.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(ride, { as: "rides", foreignKey: "ownerId"});
  schedule.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(schedule, { as: "schedules", foreignKey: "ownerId"});
  scheduleride.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(scheduleride, { as: "schedulerides", foreignKey: "ownerId"});
  users.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(users, { as: "users", foreignKey: "ownerId"});
  userstatistics.belongsTo(users, { as: "owner", foreignKey: "ownerId"});
  users.hasMany(userstatistics, { as: "userstatistics", foreignKey: "ownerId"});
  person.belongsTo(userstatistics, { as: "statistics_userstatistic", foreignKey: "statistics"});
  userstatistics.hasOne(person, { as: "person", foreignKey: "statistics"});

  return {
    alert,
    blconfigurationitemdescription,
    car,
    countryinformation,
    deviceregistration,
    driver,
    location,
    loggers,
    person,
    rate,
    reserve,
    ride,
    schedule,
    scheduleride,
    users,
    userstatistics,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
