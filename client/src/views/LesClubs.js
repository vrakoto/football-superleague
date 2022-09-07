import { useEffect, useRef, useState } from 'react'
import '../css/clubs.css'
import axios from 'axios'
import Filter from '../components/lesJoueurs/DropdownFilter';
import Card from '../components/lesClubs/Card';

function Players() {
    const refFilterClub = useRef()

    const [lesClubs, setLesClubs] = useState([])
    const [lesPays, setLesPays] = useState([])

    const [searchClub, setSearchClub] = useState('')
    const [previousClubs, setPreviousClubs] = useState([]) // Conserve l'état des derniers clubs avant d'entamer une recherche

    const [swap, setSwap] = useState(false)
    const [filters, setFilters] = useState({ idPays: 'all', pays: 'Afficher TOUT' })


    const getLesPays = async () => {
        axios.get('/club/pays').then((response) => {
            setLesPays(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const getLesClubs = async () => {
        axios.get('/club/clubs', {params: filters}).then((response) => {
            setLesClubs(response.data)
            setPreviousClubs(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    const searchClubResult = () => {
        return previousClubs.filter((club) => club.nom.toLowerCase().includes(searchClub.toLowerCase()))
    }

    // charge les club et joueurs dans un premier temps
    useEffect(() => {
        return () => {
            getLesPays();
            getLesClubs();
        }
    }, [])

    // Filtre d'un ou plusieurs club(s) dynamiquement 
    useEffect(() => {
        setLesClubs(searchClubResult())
    }, [searchClub])

    // Update la liste des joueurs à chaque fois qu'un filtre est appliqué par l'utilisateur
    useEffect(() => {
        getLesClubs()
    }, [filters])

    return (
        <div className={swap ? 'selectedPlayer' : ''}>
            <div className="container-fluid d-flex justify-content-center align-items-center banner">
                <div className="container d-flex content">
                    <h1>Les Clubs</h1>
                    <input type="text" className="ms-3 bannerSearch" name="searchingClub" onChange={(e) => setSearchClub(e.target.value)} placeholder="Rechercher un club..." />
                </div>
            </div>

            <div className="container mt-5">

                <div className="filters d-flex justify-content-center">

                    <Filter
                        sonRef={refFilterClub}
                        nameFilter="pays"
                        id="idPays"
                        columnFilterInDB="nom"
                        selectedDropdownValue={filters.pays}
                        contentDropdown={lesPays}
                        filters={filters}
                        setFilters={setFilters}
                    />

                </div>

                <div className="d-flex flex-wrap justify-content-center mt-5">
                    {(lesClubs.length > 0) && lesClubs.map((club, key) =>
                        <Card key={key} id={club.id} nom={club.nom} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default Players