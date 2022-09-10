import Api from '../components/Api'
import { useEffect, useState, lazy, Suspense } from "react"
const Groupes = lazy(() => import("../components/simulation/Groupes"))

function Simulation() {
    const [isFilled, setIsFilled] = useState(false)
    const [swap, setSwap] = useState(false)

    const listeChampionnats = {
        "Allemagne": [],
        "Angleterre": [],
        "Espagne": [],
        "France": [],
        "Italie": []
    }

    const [lesChampionnats, setLeChampionnat] = useState(listeChampionnats)

    const getLesClubs = () => {
        Api.get('/pays/clubs', { params: { idPays: 'all' } }).then((response) => {
            response.data.forEach((element, key) => {
                let matchName = element.Pay.nom
                
                if (lesChampionnats.hasOwnProperty(matchName)) {
                    listeChampionnats[matchName].push(element)
                }
            });
            setIsFilled(true)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        return () => {
            getLesClubs()
        }
    }, [])

    return (
        <div className={`d-flex flex-wrap justify-content-evenly  ${swap ? 'switchPage' : ''}`}>
            <Suspense fallback={<div>Chargement...</div>}>
                {isFilled && Object.keys(lesChampionnats).length > 0 && Object.getOwnPropertyNames(lesChampionnats).map((lePays, key) => 
                    <Groupes key={key} setSwap={setSwap} titre={lePays} lesClubs={lesChampionnats[lePays]} />
                )}
            </Suspense>
        </div>
    )
}

export default Simulation