import '../../css/components/groupeCard.css'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Groupes({ setSwap, blink, setBlink, titre, lesClubs }) {
    const navigate = useNavigate();

    const checkClub = (idClub) => {
        setSwap(true)
        setTimeout(() => {
            navigate(`/club/${idClub}`)
        }, 1000);
    }

    /* Only onHover */
    const addBackground = (couleur, e) => {
        e.currentTarget.style.backgroundColor = couleur;
    }
    const removeBackground = (e) => {
        e.currentTarget.style.backgroundColor = '';
    }

    return (
        <div className="border mt-5 groupeCard">
            <h3 className="text-center">{titre}</h3>
            <hr />
            <ul className={`list-unstyled ${blink ? " drawing" : ""}`} onAnimationEnd={() => setBlink(false)}>
                {lesClubs && lesClubs.map((leClub, key) => 
                    <li key={key} onClick={() => checkClub(leClub.id)} onMouseOver={(e) => addBackground(leClub.couleur, e)} onMouseOut={(e) => removeBackground(e)}>
                        <img className="smallClubLogo mx-2" src={`/images/${leClub.id}.png`} alt={leClub.nom} />
                        <span>{leClub.nom}</span>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Groupes