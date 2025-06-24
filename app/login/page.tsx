"use client";
import { Button } from "@/components/tremor/Button";
import { Input } from "@/components/tremor/Input";
import { useState } from "react";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", form);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F06AA8]">
      <div className="w-full max-w-md p-8 bg-white/25 rounded-3xl border-2 border-white backdrop-blur-sm">
        <h1 className="text-2xl text-white font-semibold text-center mb-6">
          Login
        </h1>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className=" text-sm text-white font-medium mb-2"
            >
              Email
            </label>

            <Input
              placeholder="Enter Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className=" text-sm text-white font-medium mb-2"
            >
              Password
            </label>
            <Input
              type="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <div className="flex justify-end text-white text-sm">
              <a href="">Forgot Password</a>
            </div>
          </div>

          <Button onClick={handleSubmit} className="w-full text-lg">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}
