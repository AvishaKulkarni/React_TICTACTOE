
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combination";

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
// example
// const WINNING_COMBINATIONS = [
//   [{row:0,col:0},
//    {row:0,col:1},
//    {row:0,col:2}],[],[],[]
// ];
// helper function



function deriveActivePlayer(gameTurns){
  let currentPlayer = "X";

  if(gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

return currentPlayer;
}



function deriveWinner(gameBoard, players){
  let winner; 
  for(const combination of WINNING_COMBINATIONS){
    const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column]; 
    const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column];

    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
    {
       winner = players[firstSquareSymbol];
      //  winner = firstSquareSymbol;
    }
  }
  return winner;
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  // let gameBoard = initialGameBoard;  through this we were changeing the same array to make it to relauch from start we wanted initial value so we will craete a deep copy 
       
       for (const turn of gameTurns){
      //  for (const turn of turns){
        // deriving state (try to manage as less as possible state and derive from that state as much as possible)
        const{square,player} = turn;
        const{row,col} = square; 
        gameBoard[row][col] = player;
//  here its derived from gameTurn state that is managed from App component
 
       }  
       return gameBoard;
}
function App() {
  // game is controlled by this state
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  // const [hasWinner, setHasWinner] = useState(false);can be done to check winner but state need not to be managed since that will be redundant also since it can be derived we can take that way
  // const [activePlayer, setActivePlayer] = useState('X');

  // let currentPlayer = 'X';
  //   //  instead of prevTurns we r taking now it from gameTurns
  //   if(gameTurns.length > 0 && gameTurns[0].player === 'X'){

  //     currentPlayer = 'O';

  //   }
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard  = deriveGameBoard(gameTurns);



//   let gameBoard = [...initialGameBoard.map(array => [...array])];
//   // let gameBoard = initialGameBoard;  through this we were changeing the same array to make it to relauch from start we wanted initial value so we will craete a deep copy 
       
//        for (const turn of gameTurns){
//       //  for (const turn of turns){
//         // deriving state (try to manage as less as possible state and derive from that state as much as possible)
//         const{square,player} = turn;
//         const{row,col} = square; 
//         gameBoard[row][col] = player;
// //  here its derived from gameTurn state that is managed from App component
//        }  
  // let winner; 
  // for(const combination of WINNING_COMBINATIONS){
  //   const firstSquareSymbol = gameBoard[combination[0].row] [combination[0].column];
  //   const secondSquareSymbol = gameBoard[combination[1].row] [combination[1].column]; 
  //   const thirdSquareSymbol = gameBoard[combination[2].row] [combination[2].column];

  //   if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
  //   {
  //      winner = players[firstSquareSymbol];
  //     //  winner = firstSquareSymbol;
  //   }
  // }
  const winner = deriveWinner(gameBoard, players);
 
  const hasDraw = gameTurns.length === 9 && !winner;

function handleSelectSquare(rowIndex, colIndex){
  // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' );
  setGameTurns(prevTurns => {
     let currentPlayer = deriveActivePlayer(prevTurns);
    // let currentPlayer = 'X';

    // if(prevTurns.length > 0 && prevTurns[0].player === 'X'){

    //   currentPlayer = 'O';

    // }


    const updatedTurns = [{ square: {row:rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns];

    return updatedTurns;
  }); 
}

function handleRestart(){
   setGameTurns([]);
}

// explaination ?
function handlePlayerNameChange(symbol, newName){
  setPlayers(prevPlayers => {
    
    return{
      ...prevPlayers,
      [symbol]:newName
    }
  });
}

  return (
   <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === 'X'} onChangeName={handlePlayerNameChange}/>
        <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === 'O'} onChangeName={handlePlayerNameChange}/>
      </ol>
      {/* {console.log(active)} */}
      {/* <GameBoard onSelectSquare={handleSelectSquare} turns ={gameTurns}/> */}
      {/* beacuse of the bracket winner will be checked first */}
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board ={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>
   </main>
  )
}

export default App
