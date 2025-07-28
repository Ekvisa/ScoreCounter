import "./ScoreCard.css";

type ScoreCardProps = {
  index: number;
  name: string;
  score: number;
  editing: boolean;
  tempScore: number;
  onTempScoreChange: (value: number) => void;
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
              value={tempScore}
              onChange={(e) => onTempScoreChange(parseInt(e.target.value) || 0)}
            />
          </span>
        )}
      </td>
    </tr>
  );
}

export default ScoreCard;
