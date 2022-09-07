import { getClubLogos } from "../../img/PL/exportLogos";
import '../../css/components/cardClub.css'
import { useNavigate } from 'react-router-dom';

function Card({ id, nom }) {
    const navigate = useNavigate();
    const images = getClubLogos(require.context('../../img/PL/', false, /\.(png|jpe?g|svg)$/));

    const stylesOnHover = {
        afc: "#f20004",
        cfc: "#034795",
        lfc: "#c50000",
        mcfc: "#71d0ff"
    }

    // <td><img src={images[joueur.ClubId + '.png']} alt={joueur.ClubId} /></td>

    return (
        <div className="clubCard m-3" style={{backgroundColor: stylesOnHover[id]}}>
            <div className="clubLogo">
                <img src={images[id + '.png']} alt={nom} />
            </div>
            <h3>{nom}</h3>
        </div>
    )
}

export default Card