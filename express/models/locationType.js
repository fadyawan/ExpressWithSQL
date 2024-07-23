module.exports = (sequelize, Sequelize) => {
    const LocationType = sequelize.define("location_type", {
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'location_type'
    });
  
    return LocationType;
  };
  