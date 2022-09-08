import '../../css/components/cardClub.css'
import { useNavigate } from 'react-router-dom';

function Card({ setSwap, leClub }) {
    const idClub = leClub.id
    const nom = leClub.nom
    const couleur = leClub.couleur
    const navigate = useNavigate();

    const checkClub = () => {
        setSwap(true)
        setTimeout(() => {
            navigate(`/club/${idClub}`)
        }, 1000);
    }

    return (
        <div className="clubCard m-3" onClick={() => checkClub()} style={{backgroundColor: couleur}}>
            <div className="clubLogo">
                <img src={`/images/${idClub}.png`} alt={nom} />
            </div>
            <h3>{nom}</h3>
        </div>
    )
}

export default Card