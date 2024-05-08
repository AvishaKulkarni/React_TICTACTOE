

    // const initialGameBoard = [
    //     [null, null, null],
    //     [null, null, null],
    //     [null, null, null]
    // ];
// export default function GameBoard({onSelectSquare,turns}){
export default function GameBoard({onSelectSquare,board}){
       
//        let gameBoard = initialGameBoard;
       
//        for (const turn of turns){
//         // deriving state (try to manage as less as possible state and derive from that state as much as possible)
//         const{square,player} = turn;
//         const{row,col} = square; 
//         gameBoard[row][col] = player;
// //  here its derived from gameTurn state that is managed from App component
//        } 
//     const [gameBoard, setGameBoard] = useState(initialGameBoard);
//     // Objects & arrays (whic technically are objects) are refefrence values in javaScript
//     // you should therefore not mutate them directly - instead create a (deep) copy first!
//     // lecture 80 resource
// function handleSelectSquare(rowIndex, colIndex){
//     setGameBoard((prevGameBoard) => {
//         const updatedBoard = [...prevGameBoard.map((innerArray) => [...innerArray])];
//         updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
//         return updatedBoard;
//     });
    // onSelectSquare();
// }

    // index is not tied to value but to position
    return ( 
       <ol id="game-board">
       {board.map((row, rowIndex)=> (
       <li key={rowIndex}>
        <ol>
            {row.map((playerSymbol, colIndex) => (
            <li key={colIndex}>
            <button onClick={() => onSelectSquare(rowIndex, colIndex)} disabled ={playerSymbol !== null}>
            {playerSymbol}
            </button>
            </li>
            ))}
        </ol>
       </li>
       ))}
    </ol>
);
}