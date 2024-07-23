module.exports = (sequelize, Sequelize, Customer, HolidayPackage, Hotel) => {
    const Booking = sequelize.define("booking", {
      bookingDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      amount: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'booking'
    });
  
    Booking.belongsTo(Customer, { foreignKey: 'customer_id' });
    Booking.belongsTo(HolidayPackage, { foreignKey: 'holiday_package_id' });
    Booking.belongsTo(Hotel, { foreignKey: 'hotel_id' });
  
    return Booking;
  };
  