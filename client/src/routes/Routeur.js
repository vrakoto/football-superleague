import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// import '../css/style.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import Body from '../components/Body'

import Accueil from '../views/Accueil'
import NotFound from '../views/NotFound'
import Tendances from '../views/Tendances';
import Connexion from '../views/Connexion';

function Routeur() {
    return (
        <BrowserRouter>
            <Body>
                <Routes>
                    <Route path="/" element={<Accueil />} />
                    <Route path="/tendances" element={<Tendances />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Body>
        </BrowserRouter>
    )
}

export default Routeur