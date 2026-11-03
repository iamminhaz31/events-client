"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      if (res?.error) {
        setError(res.error.message || JSON.stringify(res.error));
        setLoading(false);
      }
    } catch (e) {
      setError((e as Error).message || "Unknown error");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await authClient.signOut();
  };

  if (isPending) return <p className="p-8">Loading...</p>;

  return (
    <main className="mx-auto max-w-md space-y-4 p-8">
      <h1 className="text-2xl font-bold">NeighborHub - Auth Test</h1>

      {session ? (
        <div className="space-y-3">
          <p>
            Logged in: {session.user.name} ({session.user.email})
          </p>
          <button className="btn btn-error" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary"
          onClick={handleGoogle}
          disabled={loading}
        >
          {loading ? "Redirecting..." : "Continue with Google"}
        </button>
      )}

      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      )}
    </main>
  );
}