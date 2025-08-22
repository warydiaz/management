import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ para redirigir
import { Tournament, BingoRoom } from "./types";
import PrizesEditor from "./PrizesEditor";
import BingoRoomsSelector from "./BingoRoomsSelector";

interface Props {
  tournament: Tournament;
  bingoRooms: BingoRoom[];
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  setEditing: (editing: boolean) => void;
}

export default function TournamentForm({ tournament, bingoRooms, setTournaments, setEditing }: Props) {
  const router = useRouter();

  // Inicializamos partners, gamesName, dates y tablePrizes para evitar undefined
  const [editData, setEditData] = useState<Tournament>({
    ...tournament,
    partners: tournament.partners || [],
    gamesName: tournament.gamesName || [],
    dates: tournament.dates || { start: "", end: "" },
    tablePrizes: tournament.tablePrizes || [],
  });

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_TOURNAMENT}/tourney/${tournament.tourneyId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify(editData),
        }
      );

      if (!res.ok) {
        const data = await res.json();

        // ✅ Redirigir al login si son credenciales inválidas
        if (data.message === "Invalid credentials") {
          router.push("/login");
          return;
        }

        throw new Error(data.message || "Failed to update tournament");
      }

      const updated = await res.json();
      setTournaments((prev) => prev.map((t) => (t.tourneyId === updated.tourneyId ? updated : t)));
      setEditing(false);
    } catch (err: any) {
      // Si el error no era credenciales inválidas, mostrar alerta
      if (err.message === "Invalid credentials") {
        router.push("/login");
      } else {
        alert(`❌ Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        value={editData.tourneyName}
        onChange={(e) => setEditData({ ...editData, tourneyName: e.target.value })}
        className="border p-2 rounded"
        placeholder="Tournament Name"
      />

      <input
        type="number"
        value={editData.numberOfPlayers}
        onChange={(e) => setEditData({ ...editData, numberOfPlayers: Number(e.target.value) })}
        className="border p-2 rounded"
        placeholder="Number of Players"
      />

      <input
        type="text"
        value={editData.gameType}
        onChange={(e) => setEditData({ ...editData, gameType: e.target.value })}
        className="border p-2 rounded"
        placeholder="Game Type"
      />

      {/* Partners */}
      <input
        type="text"
        value={editData.partners.join(", ")}
        onChange={(e) => setEditData({ ...editData, partners: e.target.value.split(",").map(s => s.trim()) })}
        className="border p-2 rounded"
        placeholder="Partners (comma separated)"
      />

      {/* Dates */}
      <input
        type="date"
        value={editData.dates.start.slice(0, 10)}
        onChange={(e) => setEditData({ ...editData, dates: { ...editData.dates, start: e.target.value } })}
        className="border p-2 rounded"
      />
      <input
        type="date"
        value={editData.dates.end.slice(0, 10)}
        onChange={(e) => setEditData({ ...editData, dates: { ...editData.dates, end: e.target.value } })}
        className="border p-2 rounded"
      />

      {/* Bingo Rooms */}
      <BingoRoomsSelector
        bingoRooms={bingoRooms}
        selectedRooms={editData.gamesName}
        setSelectedRooms={(rooms) => setEditData({ ...editData, gamesName: rooms })}
      />

      {/* Prizes */}
      <PrizesEditor
        prizes={editData.tablePrizes}
        setPrizes={(prizes) => setEditData({ ...editData, tablePrizes: prizes })}
      />

      <div className="flex gap-2">
        <button onClick={handleSave} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
          Save
        </button>
        <button onClick={() => setEditing(false)} className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500">
          Cancel
        </button>
      </div>
    </div>
  );
}
