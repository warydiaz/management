import TournamentCard from "./TournamentCard";
import { Tournament, BingoRoom } from "./types";

interface Props {
  tournaments: Tournament[];
  setTournaments: React.Dispatch<React.SetStateAction<Tournament[]>>;
  bingoRooms: BingoRoom[];
}

export default function TournamentList({ tournaments, setTournaments, bingoRooms }: Props) {
  return (
    <div className="w-full max-w-4xl flex flex-col gap-4">
      {tournaments.map((t) => (
        <TournamentCard
          key={t.tourneyId}
          tournament={t}
          setTournaments={setTournaments}
          bingoRooms={bingoRooms}
        />
      ))}
    </div>
  );
}
