import "./App.css";

import { useEffect, useState } from "react";

type SetupProps = {
  onStart: (names: string[]) => void;
};

function Setup({ onStart }: SetupProps) {
  const [playerCount, setPlayerCount] = useState(2);
  const [playerNames, setPlayerNames] = useState<string[]>([]);

  const allNamesFilled = playerNames.every((name) => name.trim() !== "");

  const handleStart = () => {
    onStart(playerNames);
  };

  useEffect(() => {
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

  return (
    <div className="setupwrapper">
      <h1>Настройка игроков</h1>
      <label className="playersnumber">
        Число игроков:
        <input
          type="number"
          min="1"
          value={playerCount}
          onChange={(e) => setPlayerCount(Number(e.target.value))}
        />
      </label>

      {/* {!allNamesFilled && <p>Заполните все имена, чтобы начать игру</p>} */}

      <p className={allNamesFilled ? "hidden" : ""}>
        Заполните все имена, чтобы начать игру
      </p>

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

      <button
        onClick={handleStart}
        disabled={!allNamesFilled}
        title={!allNamesFilled ? "Введите имена всех игроков" : ""}
      >
        Начать
      </button>
    </div>
  );
}

export default Setup;
