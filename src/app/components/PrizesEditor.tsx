interface Prize {
  position: number;
  prize: string;
}

interface Props {
  prizes: Prize[];
  setPrizes: (prizes: Prize[]) => void;
}

export default function PrizesEditor({ prizes, setPrizes }: Props) {
  const handleChange = (index: number, key: "position" | "prize", value: string) => {
    const updated = [...prizes];
    if (key === "position") updated[index][key] = Number(value);
    else updated[index][key] = value;
    setPrizes(updated);
  };

  return (
    <div>
      <h3 className="font-medium mb-1">Prizes</h3>
      {prizes.map((p, i) => (
        <div key={i} className="flex gap-2 mb-1">
          <input
            type="number"
            value={p.position}
            onChange={(e) => handleChange(i, "position", e.target.value)}
            className="border p-1 rounded w-20"
            placeholder="Position"
          />
          <input
            type="text"
            value={p.prize}
            onChange={(e) => handleChange(i, "prize", e.target.value)}
            className="border p-1 rounded flex-1"
            placeholder="Prize"
          />
        </div>
      ))}
    </div>
  );
}
