// import { useState } from 'react'
import Post from "../components/Post"

function Accueil () {
    return (
        <div className="container">
            
            <div className="card text-center p-3 d-inline-block">
                <h2>Journée 1</h2>
                <hr />
                <div className="d-flex flex-column">
                    <div className="leMatch">
                        <span>EVE</span>
                        <div className="score">
                            <span>0</span>
                            <span>0</span>
                        </div>
                        <span>LIV</span>
                    </div>
                </div>
            </div>

            <div className="card">
                <h1 className="text-center">Best Player of the week</h1>
            </div>
        </div>
    )
}

export default Accueil