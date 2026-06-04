import { useState } from "react";
import "./NumberGame.css";

function NumberGame() {
  const createRandomNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
  };

  const [answer, setAnswer] = useState(
    createRandomNumber()
  );

  const [inputValue, setInputValue] = useState("");

  const [message, setMessage] = useState(
    "1부터 100 사이 숫자를 맞춰보세요."
  );

  const [tryCount, setTryCount] = useState(0);

  const [isGameClear, setIsGameClear] = useState(false);

  const handleCheck = () => {
    const number = Number(inputValue);

    if (!inputValue) {
      alert("숫자를 입력하세요.");
      return;
    }

    if (number < 1 || number > 100) {
      alert("1부터 100 사이 숫자만 입력하세요.");
      return;
    }

    const nextTryCount = tryCount + 1;

    setTryCount(nextTryCount);

    if (number === answer) {
      setMessage(
        `정답입니다! ${nextTryCount}번 만에 성공했습니다!`
      );

      setIsGameClear(true);

    } else if (number > answer) {
      setMessage("DOWN! 더 작은 숫자입니다.");

    } else {
      setMessage("UP! 더 큰 숫자입니다.");
    }

    setInputValue("");
  };

  const handleReset = () => {
    setAnswer(createRandomNumber());

    setInputValue("");

    setMessage(
      "1부터 100 사이 숫자를 맞춰보세요."
    );

    setTryCount(0);

    setIsGameClear(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCheck();
    }
  };

  return (
    <div className="game-page">
      <div className="game-card">

        <h2>숫자 맞추기 게임</h2>

        <p className="game-desc">
          컴퓨터가 랜덤 숫자를 선택했습니다.
        </p>

        <div className="game-status">
          <span>시도 횟수</span>

          <strong>{tryCount}</strong>
        </div>

        <div
          className={
            isGameClear
              ? "game-message success"
              : "game-message"
          }
        >
          {message}
        </div>

        <div className="game-input-box">

          <input
            type="number"
            value={inputValue}
            placeholder="숫자 입력"
            disabled={isGameClear}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={handleKeyDown}
          />

          <button
            type="button"
            disabled={isGameClear}
            onClick={handleCheck}
          >
            확인
          </button>

        </div>

        <button
          type="button"
          className="reset-button"
          onClick={handleReset}
        >
          다시 시작
        </button>

      </div>
    </div>
  );
}

export default NumberGame;