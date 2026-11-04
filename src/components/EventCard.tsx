import Link from "next/link";
import { EventItem, formatEventDate } from "@/lib/types";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <div className="card h-full bg-base-100 shadow-md">
      <figure className="h-48 w-full bg-base-200">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.thumbnail}
          alt={event.title}
          className="h-full w-full object-cover"
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