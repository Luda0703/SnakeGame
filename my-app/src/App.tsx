import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Snake from "./components/Snake/Snake";

function App() {
  const BOARD_LENGTH = 10;
  const [snake, setSnake] = useState([
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);

  const pressKeyHangler = useCallback(
    (e: KeyboardEvent) => {
      console.log(e.key);
      const newSnake = [...snake];
      const snakeHead = { ...newSnake[0] };

      if (e.key === "ArrowRight") {
        snakeHead.x += 1;
      } else if (e.key === "ArrowLeft") {
        snakeHead.x -= 1;
      } else if (e.key === "ArrowUp") {
        snakeHead.y -= 1;
      } else if (e.key === "ArrowDown") {
        snakeHead.y += 1;
      }

      newSnake.unshift(snakeHead);
      if (newSnake.length > 1) {
        newSnake.pop();
      }
      setSnake(newSnake);
    },
    [snake]
  );

  useEffect(() => {
    document.addEventListener("keydown", pressKeyHangler);
    return () => {
      document.removeEventListener("keydown", pressKeyHangler);
    };
  }, [pressKeyHangler]);

  return (
    <div className="App">
      <h1 className="text">SNAKE GAME</h1>
      <div className="gameBord">
        {Array.from({ length: BOARD_LENGTH * BOARD_LENGTH }, (_, i) => (
          <div key={i} className="item">
            {snake.some(
              (element) =>
                element.x === i % BOARD_LENGTH &&
                element.y === Math.floor(i / BOARD_LENGTH)
            ) && <Snake />}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
