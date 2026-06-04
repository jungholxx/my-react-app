import { useEffect, useState } from "react";
import "./SnakeGame.css";

const BOARD_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 15, y: 10 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const createFood = () => {
    return {
      x: Math.floor(Math.random() * BOARD_SIZE),
      y: Math.floor(Math.random() * BOARD_SIZE),
    };
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(createFood());
    setDirection({ x: 1, y: 0 });
    setGameOver(false);
    setScore(0);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
        if (
            e.key === "ArrowUp" ||
            e.key === "ArrowDown" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight"
        ) {
            e.preventDefault();
        }

        if (e.key === "ArrowUp" && direction.y !== 1) {
            setDirection({ x: 0, y: -1 });
        }

        if (e.key === "ArrowDown" && direction.y !== -1) {
            setDirection({ x: 0, y: 1 });
        }

        if (e.key === "ArrowLeft" && direction.x !== 1) {
            setDirection({ x: -1, y: 0 });
        }

        if (e.key === "ArrowRight" && direction.x !== -1) {
            setDirection({ x: 1, y: 0 });
        }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction]);

  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];

        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y,
        };

        const hitWall =
          newHead.x < 0 ||
          newHead.x >= BOARD_SIZE ||
          newHead.y < 0 ||
          newHead.y >= BOARD_SIZE;

        const hitBody = prevSnake.some(
          (body) => body.x === newHead.x && body.y === newHead.y
        );

        if (hitWall || hitBody) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        const eatFood =
          newHead.x === food.x &&
          newHead.y === food.y;

        if (eatFood) {
          setScore((prevScore) => prevScore + 1);
          setFood(createFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [direction, food, gameOver]);

  return (
    <div className="snake-page">
      <div className="snake-card">
        <h2>Snake Game</h2>

        <div className="snake-info">
          <span>점수: {score}</span>
          <button type="button" onClick={resetGame}>
            다시 시작
          </button>
        </div>

        <div className="snake-board">
          {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, index) => {
            const x = index % BOARD_SIZE;
            const y = Math.floor(index / BOARD_SIZE);

            const isSnake = snake.some(
              (body) => body.x === x && body.y === y
            );

            const isHead =
              snake[0].x === x &&
              snake[0].y === y;

            const isFood =
              food.x === x &&
              food.y === y;

            let className = "snake-cell";

            if (isSnake) className += " snake-body";
            if (isHead) className += " snake-head";
            if (isFood) className += " snake-food";

            return (
              <div
                key={index}
                className={className}
              />
            );
          })}
        </div>

        {gameOver && (
          <div className="game-over">
            게임 오버!
          </div>
        )}

        <p className="snake-help">
          방향키로 뱀을 움직여보세요.
        </p>
      </div>
    </div>
  );
}

export default SnakeGame;