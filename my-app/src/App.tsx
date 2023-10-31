import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Snake from "./components/Snake/Snake";

function App() {
  const BOARD_LENGTH = 10;
  const [direction, setDirection] = useState("right");
  const [snake, setSnake] = useState([
    { x: 3, y: 0 },
    { x: 2, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 0 },
  ]);

  const pressKeyHangler = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        setDirection("right");
        break;
      case "ArrowLeft":
        setDirection("left");
        break;
      case "ArrowUp":
        setDirection("up");
        break;
      case "ArrowDown":
        setDirection("down");
        break;
      default:
        break;
    }
  }, []);

  const snakeMoveHandler = useCallback(() => {
    const newSnake = [...snake];
    const snakeHead = { ...newSnake[0] };

    switch (direction) {
      case "right":
        snakeHead.x + 1 > 9 ? (snakeHead.x = 0) : (snakeHead.x += 1);
        break;
      case "left":
        snakeHead.x - 1 < 0 ? (snakeHead.x = 9) : (snakeHead.x -= 1);
        break;
      case "up":
        snakeHead.y - 1 < 0 ? (snakeHead.y = 9) : (snakeHead.y -= 1);
        break;
      case "down":
        snakeHead.y + 1 > 9 ? (snakeHead.y = 0) : (snakeHead.y += 1);
        break;
      default:
        break;
    }

    newSnake.unshift(snakeHead);
    if (newSnake.length > 1) {
      newSnake.pop();
    }
    setSnake(newSnake);
  }, [snake, direction]);

  useEffect(() => {
    const moveInterval = setInterval(snakeMoveHandler, 200);
    return () => {
      clearInterval(moveInterval);
    };
  }, [snakeMoveHandler]);

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
