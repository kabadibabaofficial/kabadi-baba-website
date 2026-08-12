"use client";

import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("info@kabadibaba.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        console.error("Admin login error:", error);
        setErrorMessage("Invalid email or password.");
        return;
      }

      window.location.href = "/admin";
    } catch (error) {
      console.error("Unexpected login error:", error);
      setErrorMessage("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-green-700">
            Kabadi Baba
          </h1>

          <p className="mt-2 text-gray-500">
            Admin Login
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Admin Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              inputMode="email"
              enterKeyHint="next"
              placeholder="info@kabadibaba.com"
              disabled={loading}
              className="min-h-[48px] w-full touch-manipulation rounded-lg border border-gray-300 p-3 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              inputMode="text"
              enterKeyHint="done"
              placeholder="Enter admin password"
              disabled={loading}
              className="min-h-[48px] w-full touch-manipulation rounded-lg border border-gray-300 p-3 text-base outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-200 disabled:bg-gray-100"
            />
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600"
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="min-h-[48px] w-full touch-manipulation rounded-lg bg-green-600 py-3 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}