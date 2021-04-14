import './style.css';

export default function TextInput({ handleChange, searchValue }){
    return(
        <input 
            className="text-input"
            type="search" 
            onChange={ handleChange }
            value={ searchValue }
            placeholder="Search"
        />
    );
}