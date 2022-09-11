import '../css/ficheClub.css'
import '../css/components/tabs.css'
import { useEffect, useState, lazy, Suspense } from 'react'
import Api from '../components/Api'
const Table = lazy(() => import("../components/lesJoueurs/Table"));

function FicheClub() {
    const [swap, setSwap] = useState(false)
    const [club, setClub] = useState({})
    const [lesJoueurs, setLesJoueurs] = useState([])
    const [currentTabs, setCurrentTabs] = useState('accueil')

    const idClub = window.location.pathname.split('/club/')[1]
    const getLeClub = async () => {
        Api.get('/club/club', { params: { idClub: idClub } }).then((response) => {
            setClub(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getLesJoueursDuClub = async () => {
        Api.get('/joueur/joueurs', { params: { idClub: idClub, idPosition: 'all', idPays: 'all'} }).then((response) => {
            setLesJoueurs(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const addBackground = (e) => {
        e.currentTarget.style.backgroundColor = club.couleur;
    }

    const removeBackground = (e) => {
        e.currentTarget.style.backgroundColor = '';
    }

    useEffect(() => {
        getLeClub()
        getLesJoueursDuClub()
    }, [])

    return (
        <div className={swap ? 'switchPage' : ''}>
            {(Object.keys(club).length > 0) ? (
                <>
                    <div className="position-relative container-fluid d-flex flex-column justify-content-center align-items-center banner club animation" style={{ backgroundColor: club.couleur }}>
                        <div className="container d-flex align-items-center">
                            <div className="bigClubLogo">
                                <img src={`/images/${club.id}.png`} alt={club.nom} />
                            </div>
                            <h1>{club.nom}</h1>
                        </div>

                        <ul className="mb-0 ficheTabs">
                            <li onClick={() => setCurrentTabs('accueil')} onMouseOver={addBackground} onMouseLeave={removeBackground}>Accueil</li>
                            <li onClick={() => setCurrentTabs('effectif')} onMouseOver={addBackground} onMouseLeave={removeBackground}>Effectif</li>
                        </ul>
                    </div>

                    <div className="container mt-5 animation2">
                        {currentTabs === 'accueil' ? (
                            <div className="row">
                                <div className="col-6 col-md-3">
                                    <div className="card">
                                        Infos
                                    </div>
                                </div>
                                <div className="col-md-8 border">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil neque recusandae, velit tempora totam harum sint sed quisquam, inventore blanditiis atque quo earum minima vel illum. Veritatis iure odio repudiandae.
                                </div>
                            </div>
                        )
                        : (currentTabs === 'effectif' && lesJoueurs.length > 0) ? (
                            <Suspense fallback={<div>Chargement...</div>}>
                                <Table datas={lesJoueurs} setDatas={setLesJoueurs} swap={swap} setSwap={setSwap} />
                            </Suspense>
                        )
                        : 'Aucun joueur'}
                    </div>
                </>
            ) : 'Club introuvable'}
        </div>
    )
}

export default FicheClub