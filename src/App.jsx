import React, { useState } from 'react';

// Kotak component
function Kotak({ value, handleKotakClick }) {
  return (
    <button className='kotak' onClick={handleKotakClick}>
      {value}
    </button>
  );
}

// Board component
function Board({ xIsNext, kotak, onPlay }) {
  function handleClick(i) {
    if (kotak[i] || calculateWinner(kotak)) return;

    const nextKotak = kotak.slice();
    nextKotak[i] = xIsNext ? 'X' : 'O';

    onPlay(nextKotak);
  }

  const winner = calculateWinner(kotak);
  let status = '';
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Giliran Jalan: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className='board'>
        {[...Array(9)].map((_, i) => (
          <Kotak key={i} value={kotak[i]} handleKotakClick={() => handleClick(i)} />
        ))}
      </div>
    </>
  );
}

// Game component
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [xIsNext, setXIsNext] = useState(true);
  const [currentMove, setCurrentMove] = useState(0);
  const currentKotak = history[currentMove];

  function handlePlay(nextKotak) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextKotak];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  function jumpTo(move) {
    setCurrentMove(move);
    setXIsNext(move % 2 === 0);
  }

  const moves = history.map((_, move) => {
    const description = move > 0 ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} kotak={currentKotak} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner
function calculateWinner(kotak) {
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
    if (kotak[a] && kotak[a] === kotak[b] && kotak[a] === kotak[c]) {
      return kotak[a];
    }
  }
  return null;
}
