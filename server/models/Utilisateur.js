const { DataTypes, Model } = require('sequelize');
const {sequelize} = require('../db/config');
const Post = require('./Post');

class Utilisateur extends Model {}
Utilisateur.init({
    identifiant: {
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    ville: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    mdp: {
        type: DataTypes.STRING(1000),
        allowNull: false
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
},
    {
        timestamps: false,
        sequelize,
        modelName: 'Utilisateur'
    }
)

Utilisateur.hasMany(Post);
Post.belongsTo(Utilisateur);

// async function generate() {
//     await sequelize.sync({force: true});
// }

// generate().then(() => {
//     console.log("Request done.");
// }).catch((err) => {
//     console.log("ERR: ", err);
// })

module.exports = Utilisateur;