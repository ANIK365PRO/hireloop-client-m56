"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      console.log(data, error);

      if (error) {
        setError(error.message || "Login failed");
        return;
      }

      if (data) {
        setMessage("Login successful!");

        
        router.push("/");
       
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Sign in to your account
        </p>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder="your@email.com"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter password"
                className="w-full border rounded-lg px-3 py-2 pr-12 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-600 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-600 px-3 py-2 rounded-lg text-sm">
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-5 text-center text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-medium"
          >
            Sign Up
          </Link>
        </div>

        <button
          onClick={() => router.back()}
          className="mt-4 w-full border py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    </main>
  );
}