// import "./ScoreCard.css";

// type ScoreCardProps = {
//   index: number;
//   name: string;
//   score: number;
//   editing: boolean;
//   tempScore: number | null;
//   onTempScoreChange: (value: number | null) => void;
//   roundWinnerIndex: number | null;
// };

// function ScoreCard({
//   index,
//   name,
//   score,
//   editing,
//   tempScore,
//   onTempScoreChange,
//   roundWinnerIndex,
// }: ScoreCardProps) {
//   return (
//     <tr className={roundWinnerIndex === index ? "winnerrow" : ""}>
//       <td>{name}</td>
//       <td className="scorecell">
//         {score}
//         {editing && (
//           <span>
//             {" + "}
//             <input
//               type="number"
//               value={tempScore === null ? "" : tempScore}
//               onChange={(e) => {
//                 const raw = e.target.value;

//                 // Разрешаем пустую строку, минус и числовые значения
//                 if (raw === "" || raw === "-") {
//                   onTempScoreChange(null);
//                   return;
//                 }

//                 const num = Number(raw);
//                 if (!isNaN(num)) {
//                   onTempScoreChange(num);
//                 }
//               }}
//               onBlur={() => {
//                 // При расфокусе пустота или "-" превращаются в 0
//                 if (tempScore === null) {
//                   onTempScoreChange(0);
//                 }
//               }}
//             />

//           </span>
//         )}
//       </td>
//     </tr>
//   );
// }

// export default ScoreCard;
import { useEffect, useState } from "react";

type ScoreCardProps = {
  index: number;
  name: string;
  score: number;
  editing: boolean;
  tempScore: number | null;
  onTempScoreChange: (value: number | null) => void;
  roundWinnerIndex: number | null;
};

function ScoreCard({
  index,
  name,
  score,
  editing,
  tempScore,
  onTempScoreChange,
  roundWinnerIndex,
}: ScoreCardProps) {
  const [inputValue, setInputValue] = useState<string>("");

  // Синхронизируем локальное состояние с родительским при открытии редактирования или смене игрока
  useEffect(() => {
    setInputValue(tempScore === null ? "" : String(tempScore));
  }, [tempScore]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
  };
  const handleFocus = () => {
    if (inputValue === "0") {
      setInputValue("");
    }
  };
  const handleBlur = () => {
    if (inputValue === "" || inputValue === "-") {
      setInputValue("0");
      onTempScoreChange(0);
    } else {
      onTempScoreChange(Number(inputValue));
    }
  };

  return (
    <tr className={roundWinnerIndex === index ? "winnerrow" : ""}>
      <td>{name}</td>
      <td className="scorecell">
        {score}
        {editing && (
          <span>
            {" + "}
            <input
              type="number"
              inputMode="numeric"
              value={inputValue}
              onFocus={handleFocus}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </span>
        )}
      </td>
    </tr>
  );
}

export default ScoreCard;
