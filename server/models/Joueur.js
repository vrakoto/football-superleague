const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');

class Joueur extends Model {}
Joueur.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    nom: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    pays: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    role: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Joueur',
    }
)

module.exports = Joueur;