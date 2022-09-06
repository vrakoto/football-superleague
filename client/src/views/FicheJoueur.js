import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import '../css/ficheJoueur.css'
import { getClubLogos } from '../img/PL/exportLogos';
// import axios from 'axios'

function FicheJoueur() {
    const { state } = useLocation()
    const images = getClubLogos(require.context('../img/PL/', false, /\.(png|jpe?g|svg)$/));

    useEffect(() => {
        console.log(state);
    }, [])
    return (
        <div>
            <div className="container-fluid d-flex justify-content-center align-items-center flex-column banner resultPlayer" style={{ backgroundColor: state.BgColor }}>
                <div className="container">
                    <h1>{`> ${state.joueur.prenom} ${state.joueur.nom.toUpperCase()}`}</h1>
                    <div className="circleClubLogo">
                        <img src={images[state.joueur.ClubId + '.png']} alt={state.joueur.ClubId} />
                    </div>
                </div>
            </div>

            <div className="container mt-5 resultPlayer2">
                <div className="row">
                    <div className="col-6 col-md-3">
                        <div className="card">
                        

                            <div className="card-body">
                                <div className="d-flex justify-content-between">
                                    <span>Club</span>
                                    <span className="fw-bold">{state.joueur.Club.nom}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between">
                                    <span>Position</span>
                                    <span className="fw-bold">{state.joueur.Position.nom}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 border">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default FicheJoueur