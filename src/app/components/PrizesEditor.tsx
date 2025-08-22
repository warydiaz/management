import { Prize } from "./types";

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

  const handleRemove = (index: number) => {
    setPrizes(prizes.filter((_, i) => i !== index));
  };

  const handleAdd = () => {
    setPrizes([...prizes, { position: 0, prize: "" }]);
  };

  return (
    <div>
      <h3 className="font-medium mb-2">Prizes</h3>

      {prizes.map((p, i) => (
        <div key={i} className="flex gap-2 mb-2 items-center">
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
          <button
            onClick={() => handleRemove(i)}
            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleAdd}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Add Prize
      </button>
    </div>
  );
}
