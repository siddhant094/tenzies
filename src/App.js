import "./App.css";
import Box from "./Components/box.js";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

function App() {
  const [nums, setNums] = useState([
    { value: 1, freeze: false, id: 0 },
    { value: 1, freeze: false, id: 1 },
    { value: 1, freeze: false, id: 2 },
    { value: 1, freeze: false, id: 3 },
    { value: 1, freeze: false, id: 4 },
    { value: 1, freeze: false, id: 5 },
    { value: 1, freeze: false, id: 6 },
    { value: 1, freeze: false, id: 7 },
    { value: 1, freeze: false, id: 8 },
    { value: 1, freeze: false, id: 9 },
  ]);

  const [endGame, setEndGame] = useState(false);

  useEffect(() => changeNumber, []);

  function changeNumber() {
    if (!endGame) {
      setNums((prevState) => {
        return prevState.map((object) => {
          if (object.freeze) {
            return object;
          }
          return { ...object, value: Math.floor(Math.random() * 6) + 1 };
        });
      });
    } else {
      setNums((prevState) => {
        return prevState.map((object) => {
          return {
            ...object,
            freeze: false,
            value: Math.floor(Math.random() * 6) + 1,
          };
        });
      });
      setEndGame(() => false);
    }
  }

  function toggleFreeze(id) {
    setNums((prevState) => {
      return prevState.map((object) => {
        if (object.id == id) {
          return { ...object, freeze: !object.freeze };
        }
        return object;
      });
    });
  }

  let i = 0;

  useEffect(() => {
    nums.map((item) => {
      if (item.freeze) {
        if (item.value == nums[9].value) {
          i++;
        }
      }
    });
    if (i == 10) {
      console.log("game over");
      setEndGame((prevState) => true);
    }
  }, nums);

  return (
    <div className="App">
      <div className="gamebox">
        <h1 className="header--tenzies">Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="button--box1">
          <Box value={nums[0]} onClick={() => toggleFreeze(0)} />
          <Box value={nums[1]} onClick={() => toggleFreeze(1)} />
          <Box value={nums[2]} onClick={() => toggleFreeze(2)} />
          <Box value={nums[3]} onClick={() => toggleFreeze(3)} />
          <Box value={nums[4]} onClick={() => toggleFreeze(4)} />
        </div>
        <div className="button--box2">
          <Box value={nums[5]} onClick={() => toggleFreeze(5)} />
          <Box value={nums[6]} onClick={() => toggleFreeze(6)} />
          <Box value={nums[7]} onClick={() => toggleFreeze(7)} />
          <Box value={nums[8]} onClick={() => toggleFreeze(8)} />
          <Box value={nums[9]} onClick={() => toggleFreeze(9)} />
        </div>
        <div className="button--box">
          <button className="button--style" onClick={changeNumber}>
            {endGame ? "New Game" : "Roll"}
          </button>
        </div>
        {endGame && <Confetti />}
      </div>
    </div>
  );
}

export default App;
