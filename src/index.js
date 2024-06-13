import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

function MyApp() {

  const [displayArray, setDisplayArray] = useState([0]);
  const OperatorsRegex = /([+\-*/]{1,})/;

  const handleButtonClick = (e) => {
    const displayElement = e.target.value;

    setDisplayArray((prevArray) => {
      //prevent multiple preceeding zeros
      if (prevArray.length === 1 && prevArray[0] === 0 && displayElement === '0') {
        return prevArray;
      }

      //prevent preceeding decimal
      if (prevArray.length === 1 && prevArray[0] === 0 && displayElement !== '.') {
        return [displayElement];
      }

      //prevent preceeding multiple decimals
      if (displayElement === '.') {
        const lastNumber = prevArray.join('').split(/[+\-*/]/).pop();
        if (lastNumber.includes('.')) {
          return prevArray;
        }
      }

      return [...prevArray, displayElement];
    })
  };
  
  const clearDisplay = () => {
    setDisplayArray([0]);
  };

  const calculate = () => {
    const formula = displayArray.join('');
    const matches = formula.match(new RegExp(OperatorsRegex, 'g'));
   
    if (!matches) {
      setDisplayArray(['Error']);
      return;
    }

    let revFormula = formula;
  
    for (const match of matches) {
      const matchLastElement = match.slice(-1);
      const matchLastTwoElements = match.substring(match.length - 2);
      
      if (match.length > 1) {
        if (matchLastElement !== '-') {
          revFormula = formula.replace(match, matchLastElement);
        } else {
          revFormula = formula.replace(match, matchLastTwoElements);
        }
      }
  
    try {
      // eslint-disable-next-line
      let result = eval(revFormula);
      if (typeof result === 'number') {
        result = parseFloat(result.toFixed(10));
      }
      setDisplayArray([result.toString()]);
    } catch (error) {
      setDisplayArray(['Error']);
    }
  }
  };
  
  return (
    <div className="calculator">
        <div className="display" id="display">{displayArray.join('')}</div>
        <div className="buttons">
            <button className="btn" id='clear' onClick={clearDisplay}>C</button>
            <button className="btn" id='one' onClick={handleButtonClick} value='1'>1</button>
            <button className="btn" id='two' onClick={handleButtonClick} value='2'>2</button>
            <button className="btn" id='three' onClick={handleButtonClick} value='3'>3</button>
            <button className="btn" id='add' onClick={handleButtonClick} value='+'>+</button>
            <button className="btn" id='four' onClick={handleButtonClick} value='4'>4</button>
            <button className="btn" id='five' onClick={handleButtonClick} value='5'>5</button>
            <button className="btn" id='six' onClick={handleButtonClick} value='6'>6</button>
            <button className="btn" id='subtract' onClick={handleButtonClick} value='-'>-</button>
            <button className="btn" id='seven' onClick={handleButtonClick} value='7'>7</button>
            <button className="btn" id='eight' onClick={handleButtonClick} value='8'>8</button>
            <button className="btn" id='nine' onClick={handleButtonClick} value='9'>9</button>
            <button className="btn" id='multiply' onClick={handleButtonClick} value='*'>*</button>
            <button className="btn" id='zero' onClick={handleButtonClick} value='0'>0</button>
            <button className="btn" id='decimal' onClick={handleButtonClick} value='.'>.</button>
            <button className="btn" id='equals' onClick={calculate}>=</button>
            <button className="btn" id='divide' onClick={handleButtonClick} value='/'>/</button>
        </div>
      </div>
  )
}

root.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
