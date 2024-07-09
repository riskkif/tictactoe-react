import { useState } from 'react'

function Kotak({ value, handleKotakClick }){

  
  
  return <button className='kotak' onClick={handleKotakClick}>
    {value}
    </button>
}

function App() {
  const [kotak, setKotak] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState (true);

  function handleClick(i){
    if(kotak[i]){
      return;
    }
    const nextKotak = kotak.slice();

    nextKotak[i] = xIsNext ? 'X' : 'O';
    setKotak(nextKotak)
    setXIsNext(!xIsNext)
    // const [value, setValuue] = useState ('')
  }


  return (
    <div className='board'>
    <Kotak value={kotak[0]} handleKotakClick={() => handleClick(0)}/>
    <Kotak value={kotak[1]} handleKotakClick={() => handleClick(1)}/>
    <Kotak value={kotak[2]} handleKotakClick={() => handleClick(2)}/>
    <Kotak value={kotak[3]} handleKotakClick={() => handleClick(3)}/>
    <Kotak value={kotak[4]} handleKotakClick={() => handleClick(4)}/>
    <Kotak value={kotak[5]} handleKotakClick={() => handleClick(5)}/>
    <Kotak value={kotak[6]} handleKotakClick={() => handleClick(6)}/>
    <Kotak value={kotak[7]} handleKotakClick={() => handleClick(7)}/>
    <Kotak value={kotak[8]} handleKotakClick={() => handleClick(8)}/>
    </div>
  )
}

function calculateWinner(Kotak){
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];

  for (let i = 0; i < lines.length; i++ ){
    const [a,b,c]= lines[i];
    // if(kotak[a])

  }
}

export default App
