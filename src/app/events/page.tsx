"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { EventItem } from "@/lib/types";
import EventCard from "@/components/EventCard";
import EventCardSkeleton from "@/components/EventCardSkeleton";

export default function UpcomingEventsPage() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<EventItem[]>("/events")
      .then(setEvents)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="text-3xl font-bold">Upcoming Events</h1>
      <p className="mt-2 opacity-70">
        Find a community event near you and join in.
      </p>

      {error && <div className="alert alert-error mt-6">{error}</div>}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events === null && !error
          ? Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
          : events?.map((event) => <EventCard key={event._id} event={event} />)}
      </div>

      {events?.length === 0 && (
        <div className="mt-8 rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="text-lg font-semibold">No upcoming events yet</p>
          <p className="mt-1 opacity-70">Be the first to create one!</p>
        </div>
      )}
    </main>
  );
}