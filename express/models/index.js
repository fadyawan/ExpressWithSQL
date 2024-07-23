const config = require("../config/db");

const Activity = require("./activity");
const Booking = require("./booking");
const Customer = require("./customer");
const HolidayPackage = require("./holidayPackage");
const Hotel = require("./hotel");
const Location = require("./location");
const LocationType = require("./locationType");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB, 
  config.USER, 
  config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.PORT
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.activity = Activity(sequelize, Sequelize);
db.customer = Customer(sequelize, Sequelize);
db.holidayPackage = HolidayPackage(sequelize, Sequelize);
db.hotel = Hotel(sequelize, Sequelize);
db.booking = Booking(sequelize, Sequelize, db.customer, db.holidayPackage, db.hotel);
db.locationType = LocationType(sequelize, Sequelize);
db.location = Location(sequelize, Sequelize, db.locationType);

module.exports = db;
