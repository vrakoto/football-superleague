import { useEffect, useRef, useState } from 'react'
import '../css/players.css'
import Countries from '../data/Countries.json'
import axios from 'axios'

function Players() {
    const [openedFilter, setOpenedFilter] = useState('')
    const divFilter = useRef();

    const [currentFilterClub, setCurrentFilterClub] = useState('Tous les Clubs')

    const [lesClubs, setLesClubs] = useState({})

    const [lesJoueurs, setLesJoueurs] = useState({})

    useEffect(() => {
        const getLesClubs = async () => {
            axios.get('/clubs').then((response) => {
                setLesClubs(response.data)
            }).catch((err) => {
                console.log(err);
            })
        }

        const getLesJoueurs = async () => {
            axios.get('/joueurs').then((response) => {
                setLesJoueurs(response.data)
            }).catch((err) => {
                console.log(err);
            })
        }

        getLesClubs();
        getLesJoueurs();
        getLesJoueursDuClub();
    }, [])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [openedFilter])


    useEffect(() => {
        getLesJoueursDuClub();
    }, [currentFilterClub])


    const getLesJoueursDuClub = async () => {
        axios.get('/club', {params: {club: currentFilterClub}}).then((response) => {
            setLesJoueurs(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }


    const handleClickOutside = e => {
        if (!divFilter.current.contains(e.target)) {
            setOpenedFilter('')
        }
    };

    const openFilter = (filter) => setOpenedFilter(filter)

    const selectCurrentClub = (club) => setCurrentFilterClub(club)

    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center banner">
                <div className="container d-flex content">
                    <h1>Les Joueurs</h1>
                    <input type="text" className="ms-3 searchPlayer" name="searchingPlayer" placeholder="Rechercher un joueur..." />
                </div>
            </div>

            <div className="container mt-5">

                <div className="filters border d-flex">

                    <div ref={divFilter} className="filterClub" onClick={() => openFilter('club')}>
                        <span className="form-text filterText"><i>Filtrer par club</i></span>
                        <p className="filterClub-club">{currentFilterClub}</p>

                        {(openedFilter === 'club') ? (
                            <ul className="listClubs">
                                <li onClick={() => setCurrentFilterClub('Tous les Clubs')}>Tous les Clubs</li>
                                <hr />
                                {(lesClubs.length > 0) ? (
                                    lesClubs.map((club, key) => (<li key={key} onClick={() => selectCurrentClub(club.nom)}>{club.nom}</li>))
                                ) : 'Aucun club'}
                            </ul>
                        ) : ''}
                    </div>

                </div>

                    <div className="mt-5">
                        {(Object.keys(lesJoueurs).length > 0) ? (
                            <table className="table">
                                <thead>
                                    <tr className="table-secondary">
                                        <th scope="col">Joueur</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Nationalité</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lesJoueurs.map((joueur, key) => (
                                        <tr key={key} className="leJoueur">
                                            <th scope="row">{joueur.prenom + ' ' + joueur.nom}</th>
                                            <td>{joueur.role}</td>
                                            <td>{joueur.pays}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : 'Aucun joueur'}
                    </div>
            </div>
        </>
    )
}

export default Players