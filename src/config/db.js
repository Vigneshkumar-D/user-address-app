const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('user_address_db', 'postgres', 'paraSF2797!', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;
