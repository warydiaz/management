"use client";

import { useEffect, useState } from "react";

interface Prize {
  position: number;
  prize: string;
}

interface Tournament {
  tourneyName: string;
  partners: string[];
  gamesName: string[];
  gameType: string;
  numberOfPlayers: number;
  tablePrizes: Prize[];
  dates: {
    start: string;
    end: string;
  };
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTournaments() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found in localStorage");
        }

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_TOURNAMENT}/tourney`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch tournaments");
        const data = await res.json();
        setTournaments(Array.isArray(data) ? data : [data]);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTournaments();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-[700px] flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Tournaments</h1>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}

        {!loading && !error && tournaments.length === 0 && (
          <p className="text-center text-gray-500">No tournaments found</p>
        )}

        <div className="flex flex-col gap-6 max-h-[500px] overflow-y-auto pr-2">
          {tournaments.map((tourney, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold mb-2 text-blue-700">
                {tourney.tourneyName}
              </h2>

              <div className="text-sm text-gray-600 flex flex-col gap-1">
                <p>
                  <strong>Game Type:</strong> {tourney.gameType}
                </p>
                <p>
                  <strong>Players:</strong> {tourney.numberOfPlayers}
                </p>
                <p>
                  <strong>Partners:</strong> {tourney.partners.join(", ")}
                </p>
                <p>
                  <strong>Games:</strong> {tourney.gamesName.join(", ")}
                </p>
                <p>
                  <strong>Start:</strong>{" "}
                  {new Date(tourney.dates.start).toLocaleDateString()}
                </p>
                <p>
                  <strong>End:</strong>{" "}
                  {new Date(tourney.dates.end).toLocaleDateString()}
                </p>
              </div>

              <h3 className="mt-3 font-medium">🏆 Prizes:</h3>
              <ul className="list-disc list-inside text-sm text-gray-700">
                {tourney.tablePrizes.map((prize, i) => (
                  <li key={i}>
                    Position {prize.position}: {prize.prize}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
