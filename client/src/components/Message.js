import '../css/content.css'

function Message(props) {
    return (
        <>
            <div className='content'>
                {props.children}
            </div>
        </>
    )
}

export default Message