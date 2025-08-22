"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TournamentList from "../components/TournamentList";
import { Tournament, BingoRoom } from "../components/types";

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [bingoRooms, setBingoRooms] = useState<BingoRoom[]>([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Tournaments
        const resTournaments = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_TOURNAMENT}/tourney`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (resTournaments.status === 401) {
          router.push("/login");
          return;
        }

        const tournamentsData = await resTournaments.json();
        setTournaments(Array.isArray(tournamentsData) ? tournamentsData : [tournamentsData]);

        // Bingo Rooms
        const resRooms = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_TOURNAMENT}/bingo-rooms`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (resRooms.status === 401) {
          router.push("/login");
          return;
        }

        const roomsData = await resRooms.json();
        setBingoRooms(roomsData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [router]);

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
