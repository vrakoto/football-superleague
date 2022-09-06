const express = require('express');
const router = express.Router();
const functions = require('../functions/auth');

const Joueur = require('../models/Joueur');
const Club = require('../models/Club');
const Position = require('../models/Position');
const Pays = require('../models/Pays');

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
    const {idClub, idPosition, idPays} = req.query
    let search = {}
    let finalRequest = {}

    let options = {
        include: [
        {
            model: Club,
            attributes: ['nom']
        },
        {
            model: Position,
            attributes: ['nom']
        },
        {
            model: Pays,
            attributes: ['nom']
        }
    ]
    }
    if (idClub !== 'all') {
        search.ClubId = idClub
    }
    if (idPosition !== 'all') {
        search.PositionId = idPosition
    }
    if (idPays !== 'all') {
        search.pays = idPays
    }

    finalRequest = options

    if (Object.keys(search).length > 0) {
        finalRequest.where = search
    }

    await Joueur.findAll(finalRequest).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        console.log(error);
        if (error) return res.send({error: "Echec lors de la tentative de récupération des joueurs"})
    })
});

// Récupère toutes les positions
router.get('/positions', async (req, res) => {
    /* let filter = {}
    const {position} = req.query
    if (position !== 'all') {
        filter = { where: { id: position } }
    } */
    
    await Position.findAll().then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        console.log(error);
        if (error) return res.send({error: "Echec lors de la tentative de récupération des rôles"})
    })
});


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

module.exports = router;