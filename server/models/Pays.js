const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

class Pays extends Model {}
Pays.init({
    id: {
        type: DataTypes.STRING(2),
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(35),
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Pays'
    }
)

module.exports = Pays;