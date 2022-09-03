const express = require('express');
const router = express.Router();
const functions = require('../functions/auth');

const Utilisateur = require('../models/Utilisateur');
const Post = require('../models/Post');

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