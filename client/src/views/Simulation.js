import Api from '../components/Api'
import { useEffect, useState, lazy, Suspense } from "react"
const Groupes = lazy(() => import("../components/simulation/Groupes"))

function Simulation() {
    const [isFilled, setIsFilled] = useState(false)
    const [swap, setSwap] = useState(false)
    const [lesClubs, setLesClubs] = useState({})
    const [random, setRandom] = useState({})
    const [blink, setBlink] = useState(false)

    const listeChampionnats = {
        "Allemagne": [],
        "Angleterre": [],
        "Espagne": [],
        "France": [],
        "Italie": []
    }

    const listeGroupes = {
        "A": [],
        "B": [],
        "C": [],
        "D": [],
        "E": []
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

    const getTousLesClubs = () => {
        Api.get('/club/clubs').then((response) => {
            setLesClubs(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        getLesClubs()
        getTousLesClubs()
    }, [])

    const draw = () => {
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;
          
            while (currentIndex !== 0) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
          
            return array;
        }
        
        function* chunks(arr, n) {
            for (let i = 0; i < arr.length; i += n) {
              yield arr.slice(i, i + n);
            }
        }
        
        setBlink(true)
        setRandom([...chunks(shuffle(lesClubs), 5)])
    }

    return (
        <div className={`${swap ? 'switchPage' : ''} mt-5`}>

            <div className="d-flex justify-content-center">
                <button className="btn btn-primary" onClick={draw}>Simuler les groupes</button>
                <button className="btn btn-success">Commencer les matchs</button>
            </div>

            <div className={`d-flex flex-wrap justify-content-evenly`}>
                <Suspense fallback={<div>Chargement...</div>}>
                {isFilled && Object.getOwnPropertyNames(lesChampionnats).map((lePays, key) => 
                    <Groupes key={key} setSwap={setSwap} titre={lePays} lesClubs={lesChampionnats[lePays]} />
                )}
            </Suspense>
            </div>

            <div className={`d-flex flex-wrap justify-content-evenly`}>
                <Suspense fallback={<div>Chargement...</div>}>
                    {Object.getOwnPropertyNames(listeGroupes).map((nom, key) => 
                        <Groupes key={key} blink={blink} setBlink={setBlink} setSwap={setSwap} titre={nom} lesClubs={(Object.keys(random).length > 0) ? random[key] : ''} />
                    )}
                </Suspense>
            </div>
        </div>
    )
}

export default Simulation