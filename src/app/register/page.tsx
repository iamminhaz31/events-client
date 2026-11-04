"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (name: string, email: string, photo: string, password: string) => {
    const e: Record<string, string> = {};

    if (!name.trim()) e.name = "Please enter your name";

    if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Please enter a valid email";

    try {
      new URL(photo);
    } catch {
      e.photo = "Please enter a valid photo URL (https://...)";
    }

    if (password.length < 6) e.password = "Password must be at least 6 characters";
    else if (!/[A-Z]/.test(password)) e.password = "Password must include an uppercase letter";
    else if (!/[a-z]/.test(password)) e.password = "Password must include a lowercase letter";

    return e;
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const photo = String(form.get("photo") || "");
    const password = String(form.get("password") || "");

    const found = validate(name, email, photo, password);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name.trim(),
      email,
      password,
      image: photo,
    });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Registration failed");
      return;
    }

    toast.success("Registration successful!");
    router.push("/");
    router.refresh();
  };

  const handleGoogle = async () => {
    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
    if (error) toast.error(error.message || "Google login failed");
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <form onSubmit={handleSubmit} className="card-body gap-3">
          <h1 className="text-3xl font-bold">Register</h1>
          <p className="text-sm opacity-70">Create your NeighborHub account</p>

          <label className="form-control">
            <span className="label-text mb-1">Name</span>
            <input
              name="name"
              type="text"
              placeholder="Your name"
              className="input input-bordered w-full"
            />
            {errors.name && <span className="mt-1 text-sm text-error">{errors.name}</span>}
          </label>

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
            <span className="label-text mb-1">Photo URL</span>
            <input
              name="photo"
              type="text"
              placeholder="https://..."
              className="input input-bordered w-full"
            />
            {errors.photo && <span className="mt-1 text-sm text-error">{errors.photo}</span>}
          </label>

          <label className="form-control">
            <span className="label-text mb-1">Password</span>
            <input
              name="password"
              type="password"
              placeholder="Uppercase, lowercase, min 6 characters"
              className="input input-bordered w-full"
            />
            {errors.password && (
              <span className="mt-1 text-sm text-error">{errors.password}</span>
            )}
          </label>

          <button type="submit" className="btn btn-primary mt-2" disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>

          <div className="divider my-1">OR</div>

          <button type="button" onClick={handleGoogle} className="btn btn-outline">
            Continue with Google
          </button>

          <p className="mt-2 text-center text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-semibold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}