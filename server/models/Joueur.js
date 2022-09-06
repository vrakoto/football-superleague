const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');
const Position = require('./Position');
const Club = require('./Club');
const Pays = require('./Pays');

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
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Joueur',
    }
)

Pays.hasMany(Joueur, {foreignKey: {
    name: 'pays',
    allowNull: false
} })
Joueur.belongsTo(Pays, {foreignKey: {
    name: 'pays',
    allowNull: false
} })

Position.hasMany(Joueur, { foreignKey: { allowNull: false } })
Joueur.belongsTo(Position)

Club.hasMany(Joueur);
Joueur.belongsTo(Club)

/* async function generate() {
    await sequelize.sync({force: true});
}

generate().then(() => {
    console.log("Request done.");
}).catch((err) => {
    console.log("ERR: ", err);
}) */

module.exports = Joueur;