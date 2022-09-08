const express = require('express');
const router = express.Router();

const Joueur = require('../models/Joueur');
const Club = require('../models/Club');
const Pays = require('../models/Pays');
const Position = require('../models/Position');

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

module.exports = router;