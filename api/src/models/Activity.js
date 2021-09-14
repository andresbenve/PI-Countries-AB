const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING,
    //allowNull: false,
    },
    difficulty: {
      type: DataTypes.DOUBLE,
     // allowNull: false,
    },
    duration: {
      type: DataTypes.DOUBLE,
    // allowNull: false,
    },
    season: {
      type: DataTypes.ENUM('summer','winter','fall','spring'),
    // allowNull: false,
    },
  });
};
