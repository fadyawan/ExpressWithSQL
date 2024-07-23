module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customer", {
      firstName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'customer'
    });
  
    return Customer;
  };
  