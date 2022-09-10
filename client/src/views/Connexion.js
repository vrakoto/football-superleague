import { useState } from "react"
import Api from "../components/Api"

function Connexion() {
    const initialFormState = {identifiant: '', mdp: ''}
    const [field, setField] = useState(initialFormState)

    const auth = (e) => {
        e.preventDefault()

        Api.post('/auth/login', field).then((msg) => {
            
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setField({...field, [name]: value})
    }

    return (
        <form className="container border mt-5 p-3" method="POST" onSubmit={auth}>
            <h1 className="text-center">Administration</h1>
            <div className='mb-3'>
                <label htmlFor="identifiant">Identifiant</label>
                <input type="text" className="form-control" name="identifiant" onChange={handleChange}></input>
            </div>

            <div className='mb-3'>
                <label htmlFor="mdp">Mot de passe</label>
                <input type="password" className="form-control" name="mdp" onChange={handleChange}></input>
            </div>

            <button type="submit" className='btn btn-primary'>Se connecter</button>
        </form>
    )
}

export default Connexion