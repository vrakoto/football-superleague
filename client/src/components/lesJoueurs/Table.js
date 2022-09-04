import { getClubLogos } from "../../img/PL/exportLogos";

function Table({data}) {
    const images = getClubLogos(require.context('../../img/PL/', false, /\.(png|jpe?g|svg)$/));
    
    return (
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
                {data.map((joueur, key) => (
                    <tr key={key} className="leJoueur">
                        <th scope="row">{joueur.prenom + ' ' + joueur.nom}</th>
                        <td>{joueur.role}</td>
                        <td><img src={images[joueur.ClubId + '.png']} alt={joueur.ClubId} /></td>
                        <td>{joueur.pays}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table