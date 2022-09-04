const express = require('express');
const router = express.Router();
const functions = require('../functions/auth');

const Joueur = require('../models/Joueur');
const Club = require('../models/Club');

router.get('/clubs', async (req, res) => {
    await Club.findAll().then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération des clubs"})
    })
});

router.get('/joueurs', async (req, res) => {
    await Joueur.findAll().then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération des joueurs"})
    })
});

router.get('/club', async (req, res) => {
    const {club} = req.query
    let filter = {}
    if (club !== 'Tous les Clubs') {
        filter = { where: { ClubNom: club } }
    }
    console.log(filter);

    await Joueur.findAll(filter).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        console.log(error);
        if (error) return res.send({error: "Echec lors de la tentative de récupération des joueurs"})
    })
});

router.post('/inscription', async (req, res) => {
    const { identifiant, nom, prenom, ville, mdp, mdp_c } = req.body
    const hash = bcrypt.hashSync(mdp, bcrypt.genSaltSync(10));

    await Utilisateur.create({
        identifiant,
        nom: 'tah',
        prenom: 'tah',
        ville: 'tah',
        mdp: hash
    }).then(() => {
        console.log("success from node");
    }).catch((error) => {
    })
});

// router.post('/connexion', functions.forwardAccessWhileConnected, (req, res, next) => {
    
// })

module.exports = router;