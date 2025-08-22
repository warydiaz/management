import { useState } from "react";
import TournamentForm from "./TournamentForm";
import { Tournament, BingoRoom } from "./types";

interface Props {
  tournament: Tournament;
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  bingoRooms: BingoRoom[];
}

export default function TournamentCard({ tournament, setTournaments, bingoRooms }: Props) {
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
          <h2 className="text-lg font-semibold">{tournament.tourneyName}</h2>
          <p><strong>Game Type:</strong> {tournament.gameType}</p>
          <p><strong>Players:</strong> {tournament.numberOfPlayers}</p>
          <p><strong>Partners:</strong> {tournament.partners.join(", ")}</p>
          <p><strong>Games:</strong> {tournament.gamesName.join(", ")}</p>
          <p><strong>Start:</strong> {new Date(tournament.dates.start).toLocaleDateString()}</p>
          <p><strong>End:</strong> {new Date(tournament.dates.end).toLocaleDateString()}</p>

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
