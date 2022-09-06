import { getClubLogos } from "../../img/PL/exportLogos";
import '../../css/components/tableJoueurs.css'


function Table({datas}) {
    const images = getClubLogos(require.context('../../img/PL/', false, /\.(png|jpe?g|svg)$/));
    return (
        <table className="table text-center">
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
                    <tr key={key} className="leJoueur">
                        <th scope="row">{joueur.prenom + ' ' + joueur.nom.toUpperCase()}</th>
                        <th>{joueur.Position.nom}</th>
                        <td><img src={images[joueur.ClubId + '.png']} alt={joueur.ClubId} /></td>
                        <td>{joueur.Pay.nom}</td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default Table