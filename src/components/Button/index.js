import './style.css';

export default function Button({ text, handleFunction, disabled }){
    return(
        <button onClick={ handleFunction } disabled={ disabled } >
            { text }
        </button>
    );
}