"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TournamentList from "../components/TournamentList";
import { Tournament, BingoRoom } from "../components/types";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [bingoRooms, setBingoRooms] = useState<BingoRoom[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_TOURNAMENT}/tourney`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTournaments(Array.isArray(data) ? data : [data]))
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_TOURNAMENT}/bingo-rooms`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setBingoRooms(data))
      .catch(console.error);
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-start bg-gray-100 p-6">
      <div className="absolute top-4 right-4">
        <Link href="/tourney/create" className="text-blue-600 hover:underline">
          Create Tournament
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-6">Tournaments</h1>

      <TournamentList tournaments={tournaments} setTournaments={setTournaments} bingoRooms={bingoRooms} />
    </main>
  );
}
