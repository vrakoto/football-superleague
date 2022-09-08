const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

class Club extends Model {}
Club.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    couleur: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Club'
    }
)

module.exports = Club;