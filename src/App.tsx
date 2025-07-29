//Спасибо, Соня! ❀
import "./App.css";

import { useEffect, useState } from "react";
import Setup from "./Setup";
import ScoreCard from "./ScoreCard";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [tempScores, setTempScores] = useState<number[]>([]);
  const [editing, setEditing] = useState(false);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);

  const handleStart = (playerNames: string[], count: number) => {
    const initialScores = Array(count).fill(0);

    setNames(playerNames);
    setScores(initialScores);
    setTempScores(initialScores);
    setIsStarted(true);

    // сохраняем в localStorage
    localStorage.setItem("names", JSON.stringify(playerNames));
    localStorage.setItem("scores", JSON.stringify(initialScores));
    localStorage.setItem("tempScores", JSON.stringify(initialScores));

    localStorage.setItem("isStarted", "true");
  };

  const handleTempScoreChange = (index: number, value: number | null) => {
    if (value === null) return;
    const updated = [...tempScores];
    updated[index] = value;
    setTempScores(updated);
  };

  const applyScores = () => {
    const updatedScores = scores.map((s, i) => s + tempScores[i]);
    setScores(updatedScores);
    localStorage.setItem("scores", JSON.stringify(updatedScores));

    // Находим максимум по обновлённым общим очкам:
    const maxScore = Math.max(...updatedScores);
    const leaders = updatedScores
      .map((score, index) => ({ score, index }))
      .filter(({ score }) => score === maxScore);

    if (leaders.length === 1) {
      setWinnerIndex(leaders[0].index); // явный победитель
      localStorage.setItem("winnerIndex", JSON.stringify(leaders[0].index));
    } else {
      setWinnerIndex(null); // ничья — не подсвечивать никого
      localStorage.setItem("winnerIndex", JSON.stringify(null));
    }

    setTempScores(Array(names.length).fill(0));
    setEditing(false);
  };

  useEffect(() => {
    const savedNames = localStorage.getItem("names");
    const savedScores = localStorage.getItem("scores");
    const savedTempScores = localStorage.getItem("tempScores");
    const savedWinnerIndex = localStorage.getItem("winnerIndex");
    const savedIsStarted = localStorage.getItem("isStarted");

    if (
      savedNames &&
      savedScores &&
      savedTempScores &&
      savedWinnerIndex &&
      savedIsStarted === "true"
    ) {
      setNames(JSON.parse(savedNames));
      setScores(JSON.parse(savedScores));
      setTempScores(JSON.parse(savedTempScores));
      setWinnerIndex(JSON.parse(savedWinnerIndex));
      setIsStarted(true);
    }
  }, []);

  const handleReset = () => {
    const confirmReset = window.confirm(
      "Начать новую игру? Все данные будут удалены."
    );
    if (confirmReset) {
      localStorage.clear(); // или точечно удалить ключи
      window.location.reload(); // или вернуться к начальному состоянию
    }
  };

  return (
    <div>
      {!isStarted ? (
        <Setup onStart={handleStart} />
      ) : (
        <div className="resultstable">
          <button onClick={() => setEditing(true)} disabled={editing}>
            ✏️
          </button>
          {editing && <button onClick={applyScores}>✔</button>}
          <table>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Счёт</th>
              </tr>
            </thead>
            <tbody>
              {names.map((name, index) => (
                <ScoreCard
                  key={index}
                  index={index}
                  name={name}
                  score={scores[index]}
                  editing={editing}
                  tempScore={tempScores[index]}
                  onTempScoreChange={(value) =>
                    handleTempScoreChange(index, value)
                  }
                  winnerIndex={winnerIndex}
                />
              ))}
            </tbody>
          </table>
          <button
            onClick={() => {
              handleReset();
            }}
          >
            Новая игра
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
