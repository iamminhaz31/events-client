"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");

    const found: Record<string, string> = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) found.email = "Thik email dao";
    if (!password) found.password = "Password dao";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Email ba password vul");
      return;
    }

    toast.success("Login successful!");
    router.push("/");
    router.refresh();
  };

  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "Google login fail hoyeche");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-sm opacity-70">Abar swagotom!</p>

          <label className="form-control">
            <span className="label-text mb-1">Email</span>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
            {errors.email && <span className="mt-1 text-sm text-error">{errors.email}</span>}
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Password</span>
            <input
              name="password"
              type="password"
              placeholder="Tomar password"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <span className="mt-1 text-sm text-error">{errors.password}</span>
            )}
          </label>

          <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>

          <div className="divider my-1">OR</div>

          <button type="button" onClick={handleGoogle} className="btn btn-outline">
            Continue with Google
          </button>

          <p className="mt-2 text-center text-sm">
            Notun user?{" "}
            <Link href="/register" className="link link-primary font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}