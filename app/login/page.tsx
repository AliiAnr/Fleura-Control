/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/tremor/Button";
import { Input } from "@/components/tremor/Input";
import { getPayloadFromToken } from "@/service/jwt";
import { login } from "@/service/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) return; // Tidak ada token, biarkan user login

    try {
      const payload = getPayloadFromToken(token);
      // Jika token expired, hapus token
      if (!payload.exp || payload.exp < Date.now() / 1000) {
        localStorage.removeItem("access_token");
        document.cookie =
          "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        return;
      }
      // Jika token valid, redirect ke dashboard
      router.push("/dashboard");
    } catch (e) {
      // Jika token tidak valid, hapus token
      localStorage.removeItem("access_token");
      document.cookie =
        "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    // Tampilkan loading toast
    const toastId = toast.loading("Logging in...");

    try {
      await login(form.email, form.password);
      toast.success("Login berhasil!", { id: toastId });
      // Delay untuk menampilkan toast sukses
      router.push("/dashboard");
    } catch (err) {
      toast.error("Login gagal. Periksa email dan password.", { id: toastId });
      setError("Login gagal. Periksa email dan password.");
      console.error(err);
    } finally {
      setLoading(false);
    }
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

          <Button
            disabled={loading}
            onClick={handleLogin}
            className="w-full text-lg"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
}
