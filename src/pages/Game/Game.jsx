import { Link } from "react-router-dom";
import "./Game.css";

function Game() {
  const gameList = [
    {
      title: "숫자 맞추기",
      path: "/game/number",
      desc: "1~100 숫자를 맞추는 게임",
    },
    {
      title: "Snake Game",
      path: "/game/snake",
      desc: "방향키로 움직이는 뱀 게임",
    },
    {
      title: "Dino Game",
      path: "/game/dino",
      desc: "점프하는 공룡 게임",
    }
  ];

  return (
    <div className="game-page">
      <div className="game-container">
        <h2>Game Center</h2>

        <div className="game-grid">
          {gameList.map((game) => (
            <Link
              key={game.path}
              to={game.path}
              className="game-card"
            >
              <h3>{game.title}</h3>

              <p>{game.desc}</p>

              <span>게임 시작 →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Game;