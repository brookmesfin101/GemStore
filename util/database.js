const Sequelize = require('sequelize').Sequelize;

const sequelize = new Sequelize('gem-store', 'root', 'Klamath9375!', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;