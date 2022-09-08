const express = require('express');
const router = express.Router();

const Joueur = require('../models/Joueur');
const Club = require('../models/Club');
const Pays = require('../models/Pays');

// Récupère tous les pays
router.get('/pays', async (req, res) => {
    await Pays.findAll({
        include: {
            model: Joueur,
            attributes: [],
            required: true
        },
        order: [['nom', 'ASC']]
    }).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération des pays"})
    })
});

// Récupère tous les clubs d'un pays
router.get('/clubs', async (req, res) => {
    const {idPays} = req.query
    let filter = {}
    if (idPays != 'all') {
        filter = { where: { PayId: idPays } }
    }

    await Club.findAll(filter).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: `Echec lors de la tentative de récupération des clubs pour le pays ${idPays}`})
    })
});


// Récupère tous les pays disposant d'au moins un club dans la BDD
router.get('/atLeastOneClub', async (req, res) => {
    await Pays.findAll({
        include: {
            model: Club,
            attributes: [],
            required: true
        },
        order: [['nom', 'ASC']]
    }).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        if (error) return res.send({error: "Echec lors de la tentative de récupération des pays"})
    })
});

module.exports = router;