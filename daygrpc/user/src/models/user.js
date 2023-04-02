const { DataTypes } = require('sequelize');
const sequelize = require('./../config/db');  

  const User = sequelize.define('User', {
    id:{
      type:DataTypes.INTEGER, 
      primaryKey: true
    },
    // Model attributes are defined here
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
      // allowNull defaults to true
    }
  }, {
    // Other model options go here
  });

module.exports = User;
