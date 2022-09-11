import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '../components/Api';

function FicheJoueur() {
    const [joueur, setJoueur] = useState({})
    const navigate = useNavigate()

    const idJoueur = window.location.pathname.split('/joueur/')[1]
    const getLeJoueur = () => {
        Api.get('/joueur/joueur', { params: { idJoueur: idJoueur } }).then((response) => {
            setJoueur(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getLeJoueur()
    }, [])

    return (
        <>
            {(Object.keys(joueur).length > 0) ? (
                <>
                    <div className="container-fluid d-flex justify-content-center align-items-center flex-column banner animation" style={{ backgroundColor: joueur.Club.couleur }}>
                        <div className="container">
                            <h1>{`> ${joueur.prenom} ${joueur.nom.toUpperCase()}`}</h1>
                            <div className="mediumClubLogo" onClick={() => navigate(`/club/${joueur.ClubId}`)}>
                                <img src={`/images/${joueur.ClubId}.png`} alt={joueur.Club.nom} />
                            </div>
                        </div>
                    </div>

                    <div className="container mt-5 animation2">
                        <div className="row">
                            <div className="col-6 col-md-3">
                                <div className="card">

                                    <div className="card-body">
                                        <div className="d-flex justify-content-between">
                                            <span>Club</span>
                                            <span className="fw-bold">{joueur.Club.nom}</span>
                                        </div>
                                        <hr />
                                        <div className="d-flex justify-content-between">
                                            <span>Position</span>
                                            <span className="fw-bold">{joueur.Position.nom}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 border">

                            </div>
                        </div>
                    </div>
                </>
            ) : 'Joueur introuvable'}
        </>
    )
}

export default FicheJoueur