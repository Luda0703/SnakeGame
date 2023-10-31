import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import Food from "./components/Food/Food";
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

  const [level, setLevel] = useState(1);
  const [speed, setSpeed] = useState(0);

  const generateFood = () => {
    const x = Math.floor(Math.random() * BOARD_LENGTH);
    const y = Math.floor(Math.random() * BOARD_LENGTH);
    return { x, y };
  };

  const [gameOver, setGameOver] = useState(false);

  const [food, setFood] = useState(generateFood);

  const pressKeyHangler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowRight":
          if (direction !== "left") {
            setDirection("right");
          }
          break;
        case "ArrowLeft":
          if (direction !== "right") {
            setDirection("left");
          }
          break;
        case "ArrowUp":
          if (direction !== "down") {
            setDirection("up");
          }
          break;
        case "ArrowDown":
          if (direction !== "up") {
            setDirection("down");
          }
          break;
        default:
          break;
      }
    },
    [direction]
  );

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
    const moveInterval = setInterval(snakeMoveHandler, 700 - level * 50);
    return () => {
      clearInterval(moveInterval);
    };
  }, [snakeMoveHandler, level]);

  useEffect(() => {
    if (snake[0].x === food.x && snake[0].y === food.y) {
      setFood(generateFood());
      setSpeed((prev) => (prev += 10));
      if (speed % 50) {
        if (level <= 13) {
          setLevel((prev) => (prev += 1));
        }
      }
      const newSnake = [...snake];
      const tail = { ...newSnake[newSnake.length - 1] };
      newSnake.push(tail);
      setSnake(newSnake);
    }

    for (let i = 1; i < snake.length; i++) {
      if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
        setGameOver(true);
      }
    }
  }, [food, snake, speed, level]);

  useEffect(() => {
    document.addEventListener("keydown", pressKeyHangler);
    return () => {
      document.removeEventListener("keydown", pressKeyHangler);
    };
  }, [pressKeyHangler]);

  return (
    <div className="App">
      <h1 className="text">SNAKE GAME</h1>
      <section>
        <p className="level-speed">LEVEL: {level}</p>
        <p className="level-speed">SPEED: {speed}</p>
      </section>
      <div className="gameBord">
        {!gameOver ? (
          <Food x={food.x} y={food.y} />
        ) : (
          <h2 className="game-over">GAME OVER</h2>
        )}
        {!gameOver &&
          Array.from({ length: BOARD_LENGTH * BOARD_LENGTH }, (_, i) => (
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
