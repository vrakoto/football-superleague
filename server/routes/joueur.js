const express = require('express');
const router = express.Router();

const Joueur = require('../models/Joueur');
const Club = require('../models/Club');
const Pays = require('../models/Pays');
const Position = require('../models/Position');

// Récupère tous les joueurs
router.get('/joueurs', async (req, res) => {
    const {idClub, idPosition, idPays} = req.query
    let search = {}
    let finalRequest = {}

    let options = {
        include: [
        {
            model: Club,
            attributes: ['nom', 'couleur']
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

// Récupère les informations d'un joueur spécifique
router.get('/joueur', async (req, res) => {
    const { idJoueur } = req.query

    await Joueur.findByPk(idJoueur, {
        include: [
            {
                model: Club,
                attributes: ['nom', 'couleur']
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
    }).then((datas) => {
        return res.json(datas)
    }).catch((error) => {
        console.log(error);
        if (error) return res.send({error: "Echec lors de la tentative de récupération du joueur"})
    })
});

module.exports = router;