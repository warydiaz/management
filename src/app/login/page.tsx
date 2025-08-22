"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_LOGIN}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        
        router.push("/tourneys");
      } else {
        const data = await res.json();
        setError(`❌ Incorrect email or password`);
      }
    } catch (error) {
      setError("❌ Connection error. Please try again.");
    }
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute top-4 right-4">
        <Link href="/signup" className="text-blue-600 hover:underline">
          Create Account
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="User"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 rounded placeholder-gray-400 text-black focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded placeholder-gray-400 text-black focus:outline-none"
        />

        {/* Error message */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Enter
        </button>
      </form>
    </main>
  );
}
