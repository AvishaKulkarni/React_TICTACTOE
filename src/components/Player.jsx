import {useState} from 'react';
export default function Player({initialName, symbol, isActive, onChangeName}){
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    
    function handleEditClick(){
        // setIsEditing(isEditing ? false : true);   (flaws : unnecessary complecated )
        // setIsEditing(!isEditing); (will do same thing but still not perfect) it will notupdate instantly but get scheduled for future which might take few seconds to update
        //  strongly recommended to pass a function when new state depend on previous state this will automatically be called by react and will receive the guranteed latest state value
        setIsEditing((editing) => !editing);

        if(isEditing){
           onChangeName(symbol,playerName);
        }

    }

    function handleChange(event){
        console.log(event);
        // explanation : 78 lecture
        setPlayerName(event.target.value);
    }
    

    let editablePlayerName = <span className="player-name">{playerName}</span> ;
    // let btnCaption = 'Edit';
    if(isEditing){
       editablePlayerName  = <input type='text' required value={playerName} onChange={handleChange}/>
    //    btnCaption='Save';
    }
    return(
        <li className={isActive  ? 'active' : undefined}>
        <span className="player">
        {editablePlayerName }
        <span className="player-symbol">{symbol}</span>
        </span>
        {/* <button onClick={handleEditClick}>{btnCaption}</button> */}
        <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}