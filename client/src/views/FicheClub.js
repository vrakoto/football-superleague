import '../css/ficheClub.css'
import { useEffect, useState } from 'react'
import Api from '../components/Api'

function FicheClub() {
    const [club, setClub] = useState({})

    const idClub = window.location.pathname.split('/club/')[1]
    const getLeClub = () => {
        Api.get('/club/club', { params: { idClub: idClub } }).then((response) => {
            setClub(response.data)
        }).catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        return () => getLeClub()
    }, [])

    return (
        <>
            {(Object.keys(club).length > 0) ? (
                <>
                    <div className="container-fluid d-flex justify-content-center align-items-center banner club animation" style={{ backgroundColor: club.couleur }}>
                        <div className="container d-flex align-items-center">
                            <div className="bigClubLogo">
                                <img src={`/images/${club.id}.png`} alt={club.nom} />
                            </div>
                            <h1>{club.nom}</h1>
                        </div>
                    </div>

                    <div className="container mt-5 animation2">
                        <div className="row">
                            <div className="col-6 col-md-3">
                                <div className="card">
                                    Infos
                                </div>
                            </div>
                            <div className="col-md-8 border">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil neque recusandae, velit tempora totam harum sint sed quisquam, inventore blanditiis atque quo earum minima vel illum. Veritatis iure odio repudiandae.
                            </div>
                        </div>
                    </div>
                </>
            ) : 'Club introuvable'}
        </>
    )
}

export default FicheClub