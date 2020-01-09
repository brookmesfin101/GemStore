const DataTypes = require('sequelize').DataTypes;
const sequelize = require('../util/database');

var Gem = sequelize.define("Gem", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 140]
        }
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: 0
        }
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Gem;