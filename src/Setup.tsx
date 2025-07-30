import "./App.css";

import { useEffect, useState } from "react";

type SetupProps = {
  onStart: (names: string[], count: number) => void;
};

function Setup({ onStart }: SetupProps) {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const allNamesFilled = playerNames.every((name) => name.trim() !== "");

  const handleStart = () => {
    if (playerCount !== null) {
      onStart(playerNames, playerCount);
    }
  };

  useEffect(() => {
    if (playerCount === null) return;
    setPlayerNames((prev) => {
      if (playerCount > prev.length) {
        return [...prev, ...Array(playerCount - prev.length).fill("")];
      } else if (playerCount < prev.length) {
        return prev.slice(0, playerCount);
      } else {
        return prev;
      }
    });
  }, [playerCount]);
  console.log(allNamesFilled);
  console.log(playerCount);
  return (
    <div className="setupwrapper">
      <h1>Настройка игроков</h1>
      <label className="playersnumber">
        Число игроков:
        <input
          type="number"
          min="1"
          value={playerCount === null ? "" : playerCount}
          onChange={(e) => {
            const value = e.target.value;
            setPlayerCount(value === "" ? null : Number(value));
          }}
          onBlur={() => {
            if (playerCount === null || playerCount < 1) {
              setPlayerCount(1); // 1 игрок по умолчанию
            }
          }}
        />
      </label>

      {/* <p className={allNamesFilled ? "hidden" : ""}>
        Заполните все имена, чтобы начать
      </p> */}

      <ul>
        {playerNames.map((name, index) => (
          <li>
            <input
              key={index}
              type="text"
              value={name}
              placeholder={`Имя игрока ${index + 1}`}
              onChange={(e) => {
                const newNames = [...playerNames];
                newNames[index] = e.target.value;
                setPlayerNames(newNames);
              }}
            />
          </li>
        ))}
      </ul>
      {playerCount !== null ? (
        allNamesFilled ? (
          <p>Готово! Весёлой игры! 🌿</p>
        ) : (
          <p>Заполните все имена, чтобы начать</p>
        )
      ) : (
        ""
      )}

      <button
        onClick={handleStart}
        disabled={!allNamesFilled || playerNames.length < 1}
        title={!allNamesFilled ? "Введите имена всех игроков" : ""}
      >
        Начать
      </button>
    </div>
  );
}

export default Setup;
