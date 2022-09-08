import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import Body from '../components/Body'

import Accueil from '../views/Accueil'
import Connexion from '../views/Connexion';
import LesJoueurs from '../views/LesJoueurs';
import FicheJoueur from '../views/FicheJoueur';
import LesClubs from '../views/LesClubs';
import FicheClub from '../views/FicheClub';
import NotFound from '../views/NotFound'

function Routeur() {
    return (
        <BrowserRouter>
            <Body>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/joueurs" element={<LesJoueurs />} />
                    <Route path="/joueur/:userId" element={<FicheJoueur />} />
                    <Route path="/clubs" element={<LesClubs />} />
                    <Route path="/club/:clubId" element={<FicheClub />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Body>
        </BrowserRouter>
    )
}

export default Routeur