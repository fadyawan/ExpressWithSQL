module.exports = (sequelize, Sequelize) => {
    const Activity = sequelize.define("activity", {
      description: {
        type: Sequelize.STRING,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      duration: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      location: {
        type: Sequelize.STRING,
        allowNull: false
      }
    }, {
      timestamps: false,
      freezeTableName: true,
      tableName: 'activity'
    });
  
    return Activity;
  };
  