"use client";

import { useEffect, useState } from "react";

type Status = "loading" | "ok" | "error";

export default function Home() {
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    fetch(`${apiUrl}/health`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.ok ? "ok" : "error");
        setMessage(data.message);
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message);
      });
  }, []);

  return (
    <main className="min-h-screen flex items-center justify-center p-6">
      <div className="card bg-base-200 shadow-xl w-full max-w-md">
        <div className="card-body items-center text-center">
          <h1 className="card-title text-2xl">NeighborHub</h1>
          <p>Social Development Events Platform</p>

          {status === "loading" && (
            <span className="loading loading-spinner loading-md" />
          )}
          {status === "ok" && (
            <div className="badge badge-success">Server: {message}</div>
          )}
          {status === "error" && (
            <div className="badge badge-error">Server error: {message}</div>
          )}
        </div>
      </div>
    </main>
  );
}