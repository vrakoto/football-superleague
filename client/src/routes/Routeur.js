import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import Body from '../components/Body'

import Accueil from '../views/Accueil'
import Connexion from '../views/Connexion';
import Players from '../views/Players';
import NotFound from '../views/NotFound'

function Routeur() {
    return (
        <BrowserRouter>
            <Body>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/players" element={<Players />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Body>
        </BrowserRouter>
    )
}

export default Routeur