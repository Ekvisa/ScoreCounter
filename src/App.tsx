//Спасибо, Соня! ❀
import "./App.css";

import { useState } from "react";
import Setup from "./Setup";
import ScoreCard from "./ScoreCard";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [names, setNames] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>([]);
  const [tempScores, setTempScores] = useState<number[]>([]);
  const [editing, setEditing] = useState(false);
  const [roundWinnerIndex, setRoundWinnerIndex] = useState<number | null>(null);

  const handleStart = (playerNames: string[]) => {
    setNames(playerNames);
    setScores(Array(playerNames.length).fill(0));
    setTempScores(Array(playerNames.length).fill(0));
    setIsStarted(true);
  };

  const handleTempScoreChange = (index: number, value: number) => {
    const updated = [...tempScores];
    updated[index] = value;
    setTempScores(updated);
  };

  const applyScores = () => {
    const updatedScores = scores.map((s, i) => s + tempScores[i]);
    setScores(updatedScores);

    // определение победителя раунда:
    const maxScore = Math.max(...tempScores);
    const winners = tempScores
      .map((score, index) => ({ score, index }))
      .filter(({ score }) => score === maxScore);

    if (winners.length === 1) {
      setRoundWinnerIndex(winners[0].index); // например, как useState<number | null>
    } else {
      setRoundWinnerIndex(null); // ничья
    }

    setTempScores(Array(names.length).fill(0));
    setEditing(false);
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
                  roundWinnerIndex={roundWinnerIndex}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;
