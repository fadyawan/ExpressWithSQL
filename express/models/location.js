module.exports = (sequelize, Sequelize, LocationType) => {
    const Location = sequelize.define("location", {
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
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'location'
    });
  
    Location.belongsTo(LocationType, { foreignKey: 'location_type_id' });
  
    return Location;
  };
  