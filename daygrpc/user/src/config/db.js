const Sequelize= require("sequelize");
const path = require("path")


const sequelize = new Sequelize({
    dialect: 'mysql',
    database:"crud_operation",
    username: "root",
    password: "Tab@#123",
    host:"localhost",
});



module.exports =  sequelize;