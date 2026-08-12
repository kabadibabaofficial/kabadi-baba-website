"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === "kabadi123") {
      document.cookie = "admin-auth=true; path=/";
      router.push("/admin");
    } else {
      alert("Wrong Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-[350px]">

        <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
          Kabadi Baba
        </h1>

        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Login
        </button>

      </div>
    </div>
  );
}