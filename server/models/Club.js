const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');
const Joueur = require('./Joueur');

class Club extends Model {}
Club.init({
    id: {
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Club'
    }
)

Club.hasMany(Joueur);
Joueur.belongsTo(Club);

/* async function generate() {
    await sequelize.sync({force: true});
}

generate().then(() => {
    console.log("Request done.");
}).catch((err) => {
    console.log("ERR: ", err);
}) */

module.exports = Club;