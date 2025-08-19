"use client";

import React from "react";

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

export default function InputField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <input
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border p-2 rounded placeholder-gray-400 text-black focus:outline-none ${
          error ? "border-red-600" : "border-gray-300"
        }`}
      />
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </div>
  );
}
