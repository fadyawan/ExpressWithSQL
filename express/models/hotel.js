module.exports = (sequelize, Sequelize) => {
    const Hotel = sequelize.define("hotel", {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      address: {
        type: Sequelize.STRING,
        allowNull: false
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'hotel'
    });
  
    return Hotel;
  };
  