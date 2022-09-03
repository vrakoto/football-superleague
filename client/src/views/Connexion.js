function Connexion() {
    return (
        <form className="container border p-3" method="POST" action="/connexion">
            <h1 className="text-center">Connexion</h1>
            <div className='mb-3'>
                <label htmlFor="identifiant">Identifiant</label>
                <input type="text" className="form-control" id="identifiant"></input>
            </div>

            <div className='mb-3'>
                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" className="form-control  " id="mdp"></input>
            </div>

            <button type="submit" className='btn btn-primary'>Se connecter</button>
        </form>
    )
}

export default Connexion