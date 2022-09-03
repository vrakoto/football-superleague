import '../css/form.css'

const Input = ({variable, labelTitle, nameEvent, isFirst = false}) => {
    return (
        <div>
            <label htmlFor={variable}>{labelTitle}</label>
            <input type="text" name={variable} onChange={nameEvent}></input>
            <p style={{ color: 'red' }}>{fieldsError.identifiant}</p>
        </div>
    )
}

export default Input