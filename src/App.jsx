import * as React from 'react'
import * as ReactBootstrap from 'react-bootstrap'
import { useState } from 'react';

const { Badge, Button, Card } = ReactBootstrap

function Square({value, onSquareClick}) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [moves, setMoves] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);

  function handleClick(i) {

    if(prevIndex === null) {
      if(moves < 6) {
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
      }
      else {  //after move 6
        if (calculateWinner(squares) || !squares[i] || (xIsNext && squares[i] == 'O') || (!xIsNext && squares[i] == 'X')) {
          return;   //returns if game is over, if clicked on empty square, if clicked on O when we're X and vice versa
        }           //we know we clicked on our turn's "piece"
        if(i != 4 && ((xIsNext && squares[4] == 'X') || (!xIsNext && squares[4] == 'O'))){
          return; //if we're not on middle square but middle square is ours, return
        }
        setPrevIndex(i);
        return;
      }
    }
    else {  //2nd click 
      if(squares[i])  //returns if 2nd click on non-empty square
        {
          setPrevIndex(null);
          return;
        }

      switch (i){
        case 0:
          if(prevIndex != 1 && prevIndex != 3 && prevIndex != 4)
            {
              setPrevIndex(null);
              return;
            }
            break;
        case 1:
          if(prevIndex == 1 || prevIndex == 6 || prevIndex == 7 || prevIndex == 8)
            {
              setPrevIndex(null);
              return;
            }
            break;
        case 2:
          if(prevIndex != 1 && prevIndex != 5 && prevIndex != 4)
            {
              setPrevIndex(null);
              return;
            }
            break;
        case 3:
          if(prevIndex === 3 || prevIndex === 2 || prevIndex === 5 || prevIndex === 8) 
            {
              setPrevIndex(null);
              return;
            }
            break;
        case 5:
          if(prevIndex == 5 || prevIndex == 0 || prevIndex == 3 || prevIndex == 6)
            {
              setPrevIndex(null);
              return;
            }
            break;
        case 6:
          if(prevIndex != 3 && prevIndex != 4 && prevIndex != 7)
            {
              setPrevIndex(null);
              return;
            }
            break;
        case 7:
          if(prevIndex == 1 || prevIndex == 0 || prevIndex == 7 || prevIndex == 2)
            {
              setPrevIndex(null);
              return;
            }
            break;
        case 8:
          if(prevIndex != 5 && prevIndex != 4 && prevIndex != 7)
            {
              setPrevIndex(null);
              return;
            }
            break;
        default:
          break;
        } //end of switch statement
      
    }



    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    if(prevIndex !== null)
    {
      nextSquares[prevIndex] = null;
      setPrevIndex(null);
    }

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setMoves(moves + 1)
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


//export default function App() {
//  const [name, setName] = React.useState('World')
//
//  return (
//    <div className="container py-4">
//      <Card className="starter-card shadow-sm">
//        <Card.Body className="p-4">
//          <h1 className="greeting display-6 fw-bold">Hello, {name}!</h1>
//          <p className="mb-3 text-secondary">
//            This starter is set up to match the React Essentials notes more closely.
//            For the assignment, build the tic-tac-toe tutorial in this file and leave
//            mounting to <code>src/main.jsx</code>.
//          </p>
//          <div className="d-flex gap-2 flex-wrap align-items-center">
//            <Button variant="primary" onClick={() => setName('CS 35L')}>
//              Set example name
//            </Button>
//           <Badge bg="secondary" pill>
//              ReactBootstrap ready
//            </Badge>
//          </div>
//       </Card.Body>
//      </Card>
//    </div>
//  )
//}
