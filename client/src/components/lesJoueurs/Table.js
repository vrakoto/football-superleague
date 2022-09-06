import { getClubLogos } from "../../img/PL/exportLogos";
import '../../css/components/tableJoueurs.css'
import { useNavigate } from 'react-router-dom';

function Table({ datas, setSwap }) {
    const navigate = useNavigate();
    const images = getClubLogos(require.context('../../img/PL/', false, /\.(png|jpe?g|svg)$/));

    const stylesOnHover = {
        afc: "#f20004",
        cfc: "#034795",
        lfc: "#c50000",
        mcfc: "#71d0ff"
    }

    /* Only onHover */
    const addBackground = (club, e) => {
        e.currentTarget.style.backgroundColor = stylesOnHover[club];
    }
    const removeBackground = (e) => {
        e.currentTarget.style.backgroundColor = '';
    }

    const checkPlayer = (joueur, e) => {
        setSwap(true)
        setTimeout(() => {
            navigate(`/joueur/${joueur.id}`, {state: {
                BgColor: stylesOnHover[joueur.ClubId],
                joueur
            }})
        }, 1000);
    }

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr className="table-secondary">
                        <th scope="col">Joueur</th>
                        <th scope="col">Position</th>
                        <th scope="col">Club</th>
                        <th scope="col">Nationalité</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((joueur, key) =>
                        <tr key={key} className="leJoueur" onClick={(e) => checkPlayer(joueur, e)} onMouseOver={(e) => addBackground(joueur.ClubId, e)} onMouseOut={(e) => removeBackground(e)}>
                            <th scope="row">{joueur.prenom + ' ' + joueur.nom.toUpperCase()}</th>
                            <th>{joueur.Position.nom}</th>
                            <td><img src={images[joueur.ClubId + '.png']} alt={joueur.ClubId} /></td>
                            <td>{joueur.Pay.nom}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table