import { useEffect, useRef, useState } from 'react'
import '../css/players.css'
import axios from 'axios'
import Table from '../components/lesJoueurs/Table';

function Players() {
    const [openedFilter, setOpenedFilter] = useState('')
    const divFilter = useRef();

    const initialFilterClub = {id: 'all', nom: 'Tous les Clubs'}
    const [currentFilterClub, setCurrentFilterClub] = useState(initialFilterClub)

    const [lesClubs, setLesClubs] = useState({})

    const [lesJoueurs, setLesJoueurs] = useState([])
    const [previousJoueurs, setPreviousJoueurs] = useState([]) // Conserve l'état des derniers joueurs avant d'entamer une recherche
    const [searchPlayer, setSearchPlayer] = useState('')


    const getLesClubs = async () => {
        axios.get('/clubs').then((response) => {
            setLesClubs(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getLesJoueursDuClub = async () => {
        axios.get('/joueurs', {params: {club: currentFilterClub.id}}).then((response) => {
            setLesJoueurs(response.data)
            setPreviousJoueurs(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    // charge les club et joueurs dans un premier temps
    useEffect(() => {
        return () => {
            getLesClubs();
            getLesJoueursDuClub();
        }
    }, [])

    // Filtrer sur un joueur dynamiquement 
    useEffect(() => {
        setLesJoueurs(searchPlayerResult())
    }, [searchPlayer])

    // Détecte les clique à l'extérieur pour fermer le dropdown
    useEffect(() => {
        const handleClickOutside = e => {
            if (!divFilter.current.contains(e.target)) {
                setOpenedFilter('')
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openedFilter])


    // Filtrer les joueurs par club
    useEffect(() => {
        getLesJoueursDuClub();
    }, [currentFilterClub])

    const searchPlayerResult = () => {
        const results = previousJoueurs.filter((joueur) => joueur.nom.toLowerCase().includes(searchPlayer.toLowerCase()) || joueur.prenom.toLowerCase().includes(searchPlayer.toLowerCase()))
        return results
    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center banner">
                <div className="container d-flex content">
                    <h1>Les Joueurs</h1>
                    <input type="text" className="ms-3 searchPlayer" name="searchingPlayer" onChange={(e) => setSearchPlayer(e.target.value)} placeholder="Rechercher un joueur..." />
                </div>
            </div>

            <div className="container mt-5">

                <div className="filters border d-flex">

                    <div ref={divFilter} className="filterClub" onClick={() => setOpenedFilter('club')}>
                        <div className="text-center">
                            <span className="form-text filterText"><i>Filtrer par club</i></span>
                            <p className="filterClub-club">{currentFilterClub.nom}</p>
                        </div>

                        {(openedFilter === 'club') ? (
                            <ul className="listClubs">
                                <li onClick={() => setCurrentFilterClub(initialFilterClub)}>{initialFilterClub.nom}</li>
                                <hr />
                                {(lesClubs.length > 0) ? (
                                    lesClubs.map((club, key) => (<li key={key} onClick={() => setCurrentFilterClub({id: club.id, nom: club.nom})}>{club.nom}</li>))
                                ) : 'Aucun club'}
                            </ul>
                        ) : ''}
                    </div>

                </div>

                    <div className="mt-5">
                        {(lesJoueurs.length > 0) ? (
                            <Table data={lesJoueurs} />
                        ) : 'Aucun joueur'}
                    </div>
            </div>
        </>
    )
}

export default Players