const express = require('express');
const router = express.Router();

const Joueur = require('../models/Joueur');
const Club = require('../models/Club');
const Pays = require('../models/Pays');

// Récupère tous les clubs
router.get('/clubs', async (req, res) => {
    await Club.findAll().then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: `Echec lors de la tentative de récupération des clubs`})
    })
});


// Récupère le club spécifique
router.get('/club', async (req, res) => {
    const { idClub } = req.query

    await Club.findByPk(idClub).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: `Echec lors de la tentative de récupération du club ${idClub}`})
    })
});

module.exports = router;