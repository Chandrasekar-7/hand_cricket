
 import Header from "../components/header"
// import React, { useState } from 'react';
//import React, { Component } from 'react';
//import { useNavigate } from "react-router-dom"

import { UserContext } from '../App';
import React, { useState,useContext,} from 'react';
import { useNavigate } from 'react-router-dom';
// import React,{createContext} from "react";

const defaultProps = {
  coins: [
    {
      side: 'head',
      imgSrc: 'https://media.geeksforgeeks.org/wp-content/uploads/20200916123059/SHalfDollarObverse2016head-300x300.jpg'
    },
    {
      side: 'tail',
      imgSrc: 'https://media.geeksforgeeks.org/wp-content/uploads/20200916123125/tails-200x200.jpg'
    }
  ]
};

function CoinToss(props) {
  const navigate = useNavigate();
  const { selectedOne, setSelectedOne,setSelectedTwo } = useContext(UserContext);
  const { coins } = props;
  const [userChoice, setUserChoice] = useState('');
  const [result, setResult] = useState('');
  const [decision, setDecision] = useState('');
  
 
  function onsubmit() {
    navigate("/game")
  }
  const handleChoice = (choice) => {
    const tossResult = Math.random() >= 0.5 ? 'head' : 'tail';
    setUserChoice(choice);
    setResult(tossResult);
    
    if (choice === tossResult) {
      setDecision(`The result is ${tossResult}. You won the toss!`);
    }  else {
      const opponentDecision = tossResult === 'head' ? 'Bowling' : 'Batting';
      setDecision(`The result is ${tossResult}. Opponent won the toss. They chose to ${opponentDecision}.`);
     
      setSelectedTwo(opponentDecision);
       console.log(opponentDecision)
    }
    
  };
  

  const handleDecision = (decision) => {
    setSelectedOne(decision);
    console.log(selectedOne)
    alert(`You chose ${decision}`);
    navigate("/game");
  };

  return (
    <div>
      <h1>Coin Toss</h1>
      <div>
        <button onClick={() => handleChoice('head')}>Head</button>
        <button onClick={() => handleChoice('tail')}>Tail</button>
      </div>
      {result && (
        <div>
          <img
            src={coins.find(coin => coin.side === result).imgSrc}
            alt={result}
            style={{ width: '200px', height: '200px' }}
          />
          <p>{decision}</p>
          {userChoice === result && (
            <div>
              <button onClick={() => handleDecision('Batting')}>Batting</button>
              <button onClick={() => handleDecision('Bowling')}>Bowling</button>
            </div>
          )}
        </div>
      )}
       {userChoice !== result && <button onClick={onsubmit}>Next</button>}
    </div>
  );
  
}

CoinToss.defaultProps = defaultProps;

export default CoinToss;

















// const Toss = () => {
//   const [userChoice, setUserChoice] = useState('');
//   const [result, setResult] = useState('');
//   const [decision, setDecision] = useState('');

//   const handleChoice = (choice) => {
//     setUserChoice(choice);
//     const tossResult = Math.random() >= 0.5 ? 'Head' : 'Tail';
//     setResult(tossResult);
//     if (choice === tossResult) {
//       setDecision('You won the toss!');
//     } else {
//       setDecision('Opponent won the toss.');
//     }
//   };

//   const handleDecision = (decision) => {
//     alert(`You chose ${decision}`);
//   };

//   return (
//     <div>
//       <h1>Coin Toss</h1>
//       <div>
//         <button onClick={() => handleChoice('Head')}>Head</button>
//         <button onClick={() => handleChoice('Tail')}>Tail</button>
//       </div>
//       {result && (
//         <div>
//           <p>The result is: {result}</p>
//           <p>{decision}</p>
//           {userChoice === result && (
//             <div>
//               <button onClick={() => handleDecision('Batting')}>Batting</button>
//               <button onClick={() => handleDecision('Bowling')}>Bowling</button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }












//   return (
//     <div>
     
//       <h1>toss bating or bowling</h1>
//       <button onClick={onsubmit}>Batting</button>
//       <button onClick={onsubmit}>Bowling</button>
//     </div>
//   )
// }

// export default Toss