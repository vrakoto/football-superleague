const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = new Sequelize('football', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = {
    sequelize
};