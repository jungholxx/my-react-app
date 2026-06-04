import { useEffect, useRef, useState } from "react";
import "./DinoGame.css";

function DinoGame() {
  const gameRef = useRef(null);

  const [isJumping, setIsJumping] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const jump = () => {
    if (isJumping || isGameOver) return;

    setIsJumping(true);

    setTimeout(() => {
      setIsJumping(false);
    }, 500);
  };

  const restartGame = () => {
    setScore(0);
    setIsGameOver(false);
    setIsJumping(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        jump();
      }

      if (e.code === "Enter" && isGameOver) {
        restartGame();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isJumping, isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const scoreTimer = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 100);

    return () => {
      clearInterval(scoreTimer);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (isGameOver) return;

    const checkCollision = setInterval(() => {
      const dino = document.querySelector(".dino");
      const cactus = document.querySelector(".cactus");

      if (!dino || !cactus) return;

      const dinoRect = dino.getBoundingClientRect();
      const cactusRect = cactus.getBoundingClientRect();

      const dinoHitBox = {
        left: dinoRect.left + 12,
        right: dinoRect.right - 12,
        top: dinoRect.top + 12,
        bottom: dinoRect.bottom - 8
      };
      
      const cactusHitBox = {
        left: cactusRect.left + 10,
        right: cactusRect.right - 10,
        top: cactusRect.top + 10,
        bottom: cactusRect.bottom - 6
      };

      const isCollision =
        dinoHitBox.right > cactusHitBox.left &&
        dinoHitBox.left < cactusHitBox.right &&
        dinoHitBox.bottom > cactusHitBox.top &&
        dinoHitBox.top < cactusHitBox.bottom;

      if (isCollision) {
        setIsGameOver(true);
      }
    }, 20);

    return () => {
      clearInterval(checkCollision);
    };
  }, [isGameOver]);

  return (
    <div>
      <h1>Dino Game</h1>

      <p>스페이스바: 점프 / 게임오버 후 Enter: 재시작</p>

      <div className="score">
        Score: {score}
      </div>

      <div
        ref={gameRef}
        className="game-box"
        onClick={jump}
      >
        <div className={isJumping ? "dino jump" : "dino"} />

        {!isGameOver && (
          <div className="cactus"/>
        )}

        {isGameOver && (
          <div className="game-over">
            <h2>Game Over</h2>
            <button onClick={restartGame}>
              다시 시작
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DinoGame;