import { useState } from "react";
import TournamentForm from "./TournamentForm";
import { Tournament, BingoRoom } from "./types";

interface Props {
  tournament: Tournament;
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  bingoRooms: BingoRoom[];
}

export default function TournamentCard({
  tournament,
  setTournaments,
  bingoRooms,
}: Props) {
  const [editing, setEditing] = useState(false);

  return (
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col gap-3">
      {editing ? (
        <TournamentForm
          tournament={tournament}
          setTournaments={setTournaments}
          bingoRooms={bingoRooms}
          setEditing={setEditing}
        />
      ) : (
        <>
          <h2 className="text-lg font-semibold">{tournament.tourneyName || "N/A"}</h2>
          <p>
            <strong>Game Type:</strong> {tournament.gameType || "N/A"}
          </p>
          <p>
            <strong>Players:</strong> {tournament.numberOfPlayers ?? "N/A"}
          </p>
          <p>
            <strong>Partners:</strong> {tournament.partners?.join(", ") || "None"}
          </p>
          <p>
            <strong>Games:</strong> {tournament.gamesName?.join(", ") || "None"}
          </p>

          <p>
            <strong>Start:</strong>{" "}
            {tournament.dates?.start
              ? new Date(tournament.dates.start).toLocaleDateString()
              : "N/A"}
          </p>
          <p>
            <strong>End:</strong>{" "}
            {tournament.dates?.end
              ? new Date(tournament.dates.end).toLocaleDateString()
              : "N/A"}
          </p>

          <h3 className="mt-2 font-medium">🏆 Prizes:</h3>
          {tournament.tablePrizes?.length ? (
            <ul className="list-disc list-inside text-sm text-gray-700">
              {tournament.tablePrizes.map((p, i) => (
                <li key={i}>
                  Position {p.position}: {p.prize}
                </li>
              ))}
            </ul>
          ) : (
            <p>No prizes</p>
          )}

          <button
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 mt-2"
            onClick={() => setEditing(true)}
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
}
