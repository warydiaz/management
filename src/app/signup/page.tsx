"use client";

import { useState } from "react";
import InputField from "../components/InputField";
import SelectField from "../components/SelectField";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [role, setRole] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!email) newErrors.email = "Email is required.";
    else if (!validateEmail(email)) newErrors.email = "Invalid email format.";

    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    if (!name) newErrors.name = "Name is required.";
    if (!surname) newErrors.surname = "Surname is required.";
    if (!role) newErrors.role = "Role is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}:${process.env.NEXT_PUBLIC_PORT_TOURNAMENT}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, surname, role }),
      });

      if (res.ok) alert("✅ User created successfully");
      else {
        const { message } = await res.json();
        alert(`❌ Error creating user: ${message}`);
      }
    } catch (err) {
      alert("❌ Network error");
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-96 flex flex-col gap-4"
      >
        <h1 className="text-2xl font-bold text-center">Create User</h1>

        <InputField
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <InputField
          label="Name"
          value={name}
          onChange={setName}
          error={errors.name}
        />
        <InputField
          label="Surname"
          value={surname}
          onChange={setSurname}
          error={errors.surname}
        />
        <SelectField
          label="Role"
          value={role}
          onChange={setRole}
          options={["admin", "user"]}
          error={errors.role}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>
    </main>
  );
}
