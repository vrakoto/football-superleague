const express = require('express');
const router = express.Router();
const functions = require('../functions/auth');

const Joueur = require('../models/Joueur');
const Club = require('../models/Club');

// Récupère tous les clubs
router.get('/clubs', async (req, res) => {
    await Club.findAll().then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération des clubs"})
    })
});


// Récupère tous les joueurs
router.get('/joueurs', async (req, res) => {
    const {club} = req.query
    let filter = {}
    if (club !== 'all') {
        filter = { where: { ClubId: club } }
    }

    await Joueur.findAll(filter).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération des joueurs"})
    })
});

module.exports = router;