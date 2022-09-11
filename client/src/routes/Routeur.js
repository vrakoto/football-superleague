import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import Body from '../components/Body'

import Connexion from '../views/Connexion';
import LesJoueurs from '../views/LesJoueurs';
import FicheJoueur from '../views/FicheJoueur';
import LesClubs from '../views/LesClubs';
import FicheClub from '../views/FicheClub';
import Simulation from '../views/Simulation';
import NotFound from '../views/NotFound'

function Routeur() {
    return (
        <BrowserRouter>
            <Body>
                <Routes>
                    <Route path="/" element={<LesClubs />} />
                    <Route path="/joueurs" element={<LesJoueurs />} />
                    <Route path="/joueur/:userId" element={<FicheJoueur />} />
                    <Route path="/club/:clubId" element={<FicheClub />} />
                    <Route path="/simulation" element={<Simulation />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Body>
        </BrowserRouter>
    )
}

export default Routeur