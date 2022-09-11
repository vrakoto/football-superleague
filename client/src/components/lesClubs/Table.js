// import '../../css/components/tableJoueurs.css'
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

    /* const checkClub = (club) => {
        setSwap(true)
        setTimeout(() => {
            navigate(`/joueur/${joueur.id}`)
        }, 1000);
    } */

    return (
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr className="table-secondary">
                        <th scope="col"></th>
                        <th scope="col">Nom</th>
                        <th scope="col">Pays</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((club, key) =>
                        <tr key={key} className="leJoueur" onMouseOver={(e) => addBackground(club.couleur, e)} onMouseOut={(e) => removeBackground(e)}>
                            <th scope="row"><img className="smallClubLogo" src={`/images/${club.id}.png`} alt={club.nom}/></th>
                            <th>{club.nom}</th>
                            <th>{club.Pay.nom}</th>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table