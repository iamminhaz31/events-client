"use client";

import Link from "next/link";
import { EventItem, formatEventDate } from "@/lib/types";

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"><rect width="800" height="500" fill="#e5e7eb"/><text x="400" y="260" font-family="Arial, sans-serif" font-size="32" fill="#6b7280" text-anchor="middle">Image not available</text></svg>`
  );

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="card h-full bg-base-100 shadow-md">
      <figure className="h-48 w-full bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.src !== FALLBACK_IMAGE) img.src = FALLBACK_IMAGE;
          }}
        />
      </figure>

      <div className="card-body">
        <span className="badge badge-primary badge-outline">{event.eventType}</span>
        <h3 className="card-title line-clamp-2">{event.title}</h3>

        <div className="space-y-1 text-sm opacity-80">
          <p className="line-clamp-1">📍 {event.location}</p>
          <p>📅 {formatEventDate(event.date)}</p>
        </div>

        <div className="card-actions mt-auto pt-3">
          <Link href={`/events/${event._id}`} className="btn btn-primary btn-block">
            View Event
          </Link>
        </div>
      </div>
    </div>
  );
}