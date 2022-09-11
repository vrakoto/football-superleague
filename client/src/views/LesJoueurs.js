import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import '../css/players.css'
import Api from '../components/Api';

const Table = lazy(() => import("../components/lesJoueurs/Table"));
const Filter = lazy(() => import("../components/lesJoueurs/DropdownFilter"));

function Players() {
    const refFilterClub = useRef()
    const refFilterPosition = useRef()
    const refFilterPays = useRef()

    const [lesClubs, setLesClubs] = useState({})
    const [lesPositions, setLesPositions] = useState({})
    const [lesPays, setLesPays] = useState({})

    const [lesJoueurs, setLesJoueurs] = useState([])
    const [previousJoueurs, setPreviousJoueurs] = useState([]) // Conserve l'état des derniers joueurs avant d'entamer une recherche
    const [searchPlayer, setSearchPlayer] = useState('')

    // selected player animation
    const [swap, setSwap] = useState(false);

    const [filters, setFilters] = useState({ idClub: 'all', club: 'Afficher TOUT', idPosition: 'all', position: 'Afficher TOUT', idPays: 'all', pays: 'Afficher TOUT' })

    const getLesClubs = async () => {
        Api.get('/club/clubs').then((response) => {
            setLesClubs(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getLesPositions = async () => {
        Api.get('/position/positions').then((response) => {
            setLesPositions(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getLesPays = async () => {
        Api.get('/pays/pays').then((response) => {
            setLesPays(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getLesJoueursDuClub = async () => {
        Api.get('/joueur/joueurs', { params: filters }).then((response) => {
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
            getLesPositions();
            getLesPays();
        }
    }, [])

    // Filtrer sur un joueur dynamiquement 
    useEffect(() => {
        setLesJoueurs(searchPlayerResult())
    }, [searchPlayer])

    // Update la liste des joueurs à chaque fois qu'un filtre est appliqué par l'utilisateur
    useEffect(() => {
        getLesJoueursDuClub()
    }, [filters])

    const searchPlayerResult = () => {
        return previousJoueurs.filter((joueur) => joueur.nom.toLowerCase().includes(searchPlayer.toLowerCase()) || joueur.prenom.toLowerCase().includes(searchPlayer.toLowerCase()))
    }

    return (
        <div className={swap ? 'switchPage' : ''}>
            <div className="container-fluid d-flex justify-content-center align-items-center banner">
                <div className="container d-flex content">
                    <h1>Les joueurs</h1>
                    <input type="text" className="ms-3 bannerSearch" name="searchingPlayer" onChange={(e) => setSearchPlayer(e.target.value)} placeholder="Rechercher un joueur..." />
                </div>
            </div>

            <Suspense fallback={<>Chargement...</>}>
                <div className="container mt-5">
                    <div className="filters d-flex justify-content-center">
                        <Filter
                            sonRef={refFilterClub}
                            nameFilter="club"
                            id="idClub"
                            columnFilterInDB="nom"
                            selectedDropdownValue={filters.club}
                            contentDropdown={lesClubs}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <Filter
                            sonRef={refFilterPosition}
                            nameFilter="position"
                            id="idPosition"
                            columnFilterInDB="nom"
                            selectedDropdownValue={filters.position}
                            contentDropdown={lesPositions}
                            filters={filters}
                            setFilters={setFilters}
                        />

                        <Filter
                            sonRef={refFilterPays}
                            nameFilter="pays"
                            id="idPays"
                            columnFilterInDB="nom"
                            selectedDropdownValue={filters.pays}
                            contentDropdown={lesPays}
                            filters={filters}
                            setFilters={setFilters}
                        />
                    </div>

                    <div className="mt-5">
                        {(lesJoueurs.length > 0) ? (
                            <Table datas={lesJoueurs} setDatas={setLesJoueurs} swap={swap} setSwap={setSwap} />
                        ) : 'Aucun joueur'}
                    </div>
                </div>
            </Suspense>

        </div>
    )
}

export default Players