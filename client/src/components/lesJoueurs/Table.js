import '../../css/components/tableJoueurs.css'
import { useNavigate } from 'react-router-dom';

function Table({ datas, setSwap }) {
    const navigate = useNavigate();

    /* Only onHover */
    const addBackground = (couleur, e) => {
        e.currentTarget.style.backgroundColor = couleur;
    }
    const removeBackground = (e) => {
        e.currentTarget.style.backgroundColor = '';
    }

    const checkPlayer = (joueur) => {
        setSwap(true)
        setTimeout(() => {
            navigate(`/joueur/${joueur.id}`)
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
                        <tr key={key} className="leJoueur" onClick={(e) => checkPlayer(joueur)} onMouseOver={(e) => addBackground(joueur.Club.couleur, e)} onMouseOut={(e) => removeBackground(e)}>
                            <th scope="row">{joueur.prenom + ' ' + joueur.nom.toUpperCase()}</th>
                            <th>{joueur.Position.nom}</th>
                            <td><img className="smallClubLogo" src={`/images/${joueur.ClubId}.png`} alt={joueur.ClubId}/></td>
                            <td>{joueur.Pay.nom}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table