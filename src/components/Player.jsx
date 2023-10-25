import { useState } from "react";

const Player = ({ initialName, symbol,isActive }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName,setPlayerName] = useState(initialName);
  const handleInput = (e)=>{
    setPlayerName(e.target.value);
  }
  const handleClick = () => {
    setIsEditing(prevState => !prevState);
    
  };
  return (
    <li className={`${isActive ? 'active':''}`}>
      <span className="player">
        {isEditing ? (
            <span className="player-name">{playerName}</span>
          
        ) : (
            <input type="text" required value={playerName} onChange={handleInput}/>
        )}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClick}>{isEditing ? "Edit" : "Save"}</button>
    </li>
      
    
  );
};

export default Player;
