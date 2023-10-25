import { useState } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Header from "./components/Header";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combination";
import GameOver from "./components/GameOver";

const initialGame = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialGame.map(array=>[...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && thirdSquareSymbol === secondSquareSymbol){
      winner = firstSquareSymbol;
    }
  }
  function handleReset(){
    setGameTurns([]);
  }
  const hasDraw = gameTurns.length === 9 && !winner;
  const handleSelect = (rowIndex, colIndex) => {
    setGameTurns((prevState) => {
      const currentPlayer = derivedActivePlayer(prevState);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevState,
      ];
      return updatedTurn;
    });
  };
  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName="Player 1"
              symbol={"X"}
              isActive={activePlayer === "X"}
            />
            <Player
              initialName="Player 2"
              symbol={"O"}
              isActive={activePlayer === "O"}
            />
          </ol>
          {(winner || hasDraw) && <GameOver winner={winner} onHandleReset={handleReset}/>}
          <GameBoard onSelectSquare={handleSelect} board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
