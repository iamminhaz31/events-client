"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { EventItem } from "@/lib/types";
import EventCard from "../EventCard";
import EventCardSkeleton from "../EventCardSkeleton";
import SectionHeading from "../SectionHeading";

export default function UpcomingPreview() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    apiFetch<EventItem[]>("/events?limit=6")
      .then(setEvents)
      .catch((e: Error) => setError(e.message));
  }, []);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Upcoming Events"
          subtitle="The next community events happening around you."
        />

        {error && <div className="alert alert-error">{error}</div>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events === null && !error
            ? Array.from({ length: 6 }).map((_, i) => <EventCardSkeleton key={i} />)
            : events?.map((event) => <EventCard key={event._id} event={event} />)}
        </div>

        {events?.length === 0 && (
          <div className="rounded-box border border-dashed border-base-300 p-10 text-center">
            <p className="text-lg font-semibold">No upcoming events yet</p>
            <p className="mt-1 opacity-70">Be the first to create one!</p>
          </div>
        )}

        <div className="mt-10 text-center">
          <Link href="/events" className="btn btn-primary">
            View All Events
          </Link>
        </div>
      </div>
    </section>
  );
}