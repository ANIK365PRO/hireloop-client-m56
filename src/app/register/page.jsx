"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import {Description, Label, Radio, RadioGroup} from "@heroui/react";


export default function RegisterPage() {
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

      console.log('user', user)

      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
        role: user.role
      });

      // console.log(data, error);

      if (error) {
        setError(error.message || "Registration failed");
        return;
      }

      if (data) {
        setMessage("Sign up successful!");

        
          router.push("/signin");
        
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
          Create Account
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Register your account
        </p>



        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              required
              placeholder="Your name"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              Image URL
            </label>

            <input
              type="url"
              name="image"
              placeholder="Enter image URL"
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

           
      {/* RadioGroup for role base authentication */}

          <div className="flex flex-col gap-4">
                <Label>Subscription plan</Label>
                <RadioGroup defaultValue="seeker" name="role" orientation="horizontal">

                  <Radio value="seeker">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Job Seeker</Label>
                      
                    </Radio.Content>
                  </Radio>

                  <Radio value="recruiter">
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content>
                      <Label>Recruiter</Label>
                      
                    </Radio.Content>
                  </Radio>
                 
                </RadioGroup>
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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>




        <div className="mt-5 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-blue-600 font-medium"
          >
            Sign In
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