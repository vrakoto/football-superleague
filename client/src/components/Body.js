import Navbar from './Navbar'
import '../css/content.css'

function Body(props) {
    return (
        <>
            <Navbar />
            <div className='content'>
                {props.children}
            </div>
        </>
    )
}

export default Body