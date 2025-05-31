import { useState } from "react";

// There are three components in this file: Square, Board, and Game

// First the Square component takes two props: value and onSquareClick

// value is the value of the square, either 'X', 'O', or null
// onSquareClick is a function that is called when the square is clicked
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Second the Board component takes three props: xIsNext, squares, and onPlay

// xIsNext determines if the next player is 'X'
// squares is an array of 9 values that represent the state of the board
// onPlay is a function that is called when a square is clicked

// Board component renders 9 Square components in a 3x3 grid

// The value of each Square is determined by the corresponding value in squares
// The onSquareClick prop is a function that calls handleClick with the index of the square

// handleClick in Square component's onSquareClick prop
// updates the value of the square that was clicked if the game is not over

// The status of the game is displayed above the board
// The status is either the winner or the next player

// The winner is determined by the calculateWinner function
// The calculateWinner function returns 'X', 'O', or null

// The Game component maintains the game scene

// Third and final, the Game component maintains the game

// The history state is an array of moves so far
// The currentMove state is the index of the current board scene
// The xIsNext state determines if the next player is 'X'
// The currentSquares state is the current board scene
// The handlePlay function updates the history state with the next board scene
// The jumpTo function updates the currentMove state to the selected move
// The moves variable is an array of buttons that allow the player to jump to a previous move
// The moves are generated from the history state

// So, the Board component renders 9 JSX Square components and displays the game board
// each with a value and an onClick event handler in 3x3 grid
// and Board takes three props: xIsNext, squares, and onPlay
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // The handleClick function is called when a square is clicked
    // The index of the square that was clicked is passed as an argument
    // if after running calculateWinner function, there is a winner
    // or the square is not empty
    // the function returns and does nothing
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Otherwise, the nextSquares array is assigned a shallow copy of the squares array
    // The nextSquares array is a shallow copy of the squares array
    // within the scope of the handleClick function

    const nextSquares = squares.slice();
    // xIsNext is a boolean that determines if the next player is 'X'
    // The value of the ith index in nextSquares is updated to "X" or "O"
    // That is, if xIsNext is true, the ith index in nextSquares is set to "X"
    // if xIsNext is false, the ith index in nextSquares is set to "O"
    // onPlay is called with the nextSquares array

    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    // onPlay is called with the nextSquares array
    onPlay(nextSquares);
  }

  // calculateWinner function is called with the squares array
  // The winner is determined by the calculateWinner function
  // The calculateWinner function returns 'X', 'O', or null to winner
  // The status is either the winner or the next player
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    // The falsy value of 'winner' is used to determine the next player
    // If xIsNext is true, the status is "Next player: X"
    // If xIsNext is false, the status is "Next player: O"
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  // The Board component renders the Squares and the status
  return (
    <>
      {/* // The status is either the winner or the next player */}
      <div className="status">{status}</div>
      {/* // className="board-row" is a CSS class that displays the squares in a row */}
      {/* // Three div elements are used to display the squares in a 3x3 grid, 3 squares per row */}
      <div className="board-row">
        {/* // The Square components are rendered in a 3x3 grid */}
        {/* // The value of each Square is determined by the corresponding value in squares */}
        {/* // The onSquareClick prop is a function that calls handleClick with the index of the square */}
        {/* // handleClick updates the value of the square that was clicked if the game is not over */}

        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      {/* // This is the second set of 3 squares */}
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      {/* // This is the third set of 3 squares */}
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// The Game component renders the Board component and the moves
// The Board component renders the Squares and the status
// The status is either the winner or the next player
// The winner is determined by the calculateWinner function
// The calculateWinner function returns 'X', 'O', or null
// The Game component maintains the game state
// The history state is an array of board states
// The currentMove state is the index of the current board state
// The xIsNext state determines if the next player is 'X'
// The currentSquares state is the current board state
// The handlePlay function updates the history state with the next board state
// The jumpTo function updates the currentMove state to the selected move
// The moves variable is an array of buttons that allow the player to jump to a previous move
// The moves are generated from the history state

export default function Game() {
  // The history state is an array of board states for each move
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // The currentMove state is the index of the current move of player
  const [currentMove, setCurrentMove] = useState(0);
  // The xIsNext state determines if the next player is 'X'
  // It uses modulo 2 of currentMove to determine if it is the turn of next player
  // If currentMove is even, xIsNext is true, otherwise it is false
  const xIsNext = currentMove % 2 === 0;
  // The currentSquares state is the current move in the history array
  // which is determined by the currentMove state
  const currentSquares = history[currentMove];
  //handlePlay function updates the history state with the next board state

  // jumpTo function updates the currentMove state to the selected move
  //  The nextSquares array is added to the end of the nextHistory array
  //  The nextHistory is set as the new history state
  //  The currentMove is set to the index of the last board state
  //  The handlePlay function is passed as a prop to the Board component
  //  The Board component calls the handlePlay function with the nextSquares array
  //  The handlePlay function updates the history state with the nextSquares array
  function handlePlay(nextSquares) {
    // nextHistory is a new array of board states
    // It is created by slicing the history array up to the currentMove index
    // The nextSquares array is added to the end of the nextHistory array
    // This uses the spread operator to create a new array
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // The nextHistory is set as the new history state
    setHistory(nextHistory);
    // The currentMove is set to the index of the last board state
    // by getting the length of the nextHistory array and subtracting 1
    setCurrentMove(nextHistory.length - 1);
  }

  // jumpTo function updates the currentMove state to the selected move
  // where nextMove is the index of the selected move passed from the button
  // and is set as the new currentMove state
  function jumpTo(nextMove) {
    // The currentMove is set to the selected move
    setCurrentMove(nextMove);
  }

  // The moves variable is an array of buttons that allow the player to jump to a previous move
  // The moves are generated from the history state
  // The map function is used to create an array of buttons
  const moves = history.map((squares, move) => {
    let description;
    // The description is set to "Go to move #" plus the move number
    // if the move number is greater than 0
    // it means the player has made a move
    // and the description is set to "Go to move #" plus the move number
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      // if the move number is 0 or less
      // it means the game is at the start
      description = "Go to game start";
    }
    // JSX is returned for each move
    return (
      // The button is created with an onClick event handler
      // The jumpTo function is called with the move number
      // key is set to the move number
      <li key={move}>
        {/* // The button is created with an onClick event handler */}
        {/* // description is set to "Go to move #" plus the move number */}
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
      );
  });
  // The runner Game component renders the Board component and the moves
  // The Board component renders the Squares and the status
  // Returned is JSX that displays the game board and the moves
  return (
    // The "game" class styles the game container.
    // and is in the main div element
    <div className="game">
      {/* // className="game-board" is a CSS class that displays the game board */}
      <div className="game-board">
        {/* // The Board component is rendered with the xIsNext, squares, and handlePlay props */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      {/* // className="game-info" is a CSS class that displays the game info */}
      <div className="game-info">
        {/* // The moves are displayed in an ordered list */}
        {/* // The moves are generated from the history state */}
        {/* // by having used the map function to create an array of buttons */}
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// The calculateWinner function takes an array of squares as an argument
function calculateWinner(squares) {
  // The lines array contains all possible winning combinations
  const lines = [
    [0, 1, 2], // Top row win
    [3, 4, 5], // Middle row win
    [6, 7, 8], // Bottom row win
    [0, 3, 6], // Left column win
    [1, 4, 7], // Middle column win
    [2, 5, 8], // Right column win
    [0, 4, 8], // Diagonal from top-left to bottom-right win
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];
  // The for loop iterates over the lines array
  // The a, b, and c variables are set to the values of the current line
  // If the squares at the a, b, and c indexes are equal
  // and the squares at the a index is not null
  // the winner is the value of the squares at the a index
  // If there is a winner, the winner is returned
  // If there is no winner, null is returned
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
