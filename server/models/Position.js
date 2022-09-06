const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

class Position extends Model {}
Position.init({
    id: {
        type: DataTypes.STRING(2),
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(20),
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Position'
    }
)

module.exports = Position;