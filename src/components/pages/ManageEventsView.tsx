"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { apiFetch, ApiError } from "@/lib/api";
import { EventItem, formatEventDate, todayInDhaka } from "@/lib/types";
import EditEventModal from "@/components/EditEventModal";

export default function ManageEventsPage() {
  const [events, setEvents] = useState<EventItem[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [deleting, setDeleting] = useState<EventItem | null>(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const today = todayInDhaka();

  useEffect(() => {
    apiFetch<EventItem[]>("/events/mine", { auth: true })
      .then(setEvents)
      .catch((e: Error) => {
        setError(e.message);
        toast.error(e.message);
      });
  }, []);

  const handleSaved = (updated: EventItem) => {
    setEvents((prev) =>
      prev
        ? prev
            .map((e) => (e._id === updated._id ? updated : e))
            .sort((a, b) => a.date.localeCompare(b.date))
        : prev
    );
    setEditing(null);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    setDeleteBusy(true);
    try {
      await apiFetch(`/events/${deleting._id}`, { method: "DELETE", auth: true });
      setEvents((prev) => prev?.filter((e) => e._id !== deleting._id) ?? prev);
      toast.success("Event deleted");
      setDeleting(null);
    } catch (e) {
      toast.error((e as ApiError).message || "Could not delete the event");
    } finally {
      setDeleteBusy(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <p className="mt-2 opacity-70">
            Update or delete the events you created.
          </p>
        </div>
        <Link href="/create-event" className="btn btn-primary">
          Create Event
        </Link>
      </div>

      {error && <div className="alert alert-error mt-6">{error}</div>}

      {events === null && !error && (
        <div className="mt-8 space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-16 w-full" />
          ))}
        </div>
      )}

      {events?.length === 0 && (
        <div className="mt-8 rounded-box border border-dashed border-base-300 p-10 text-center">
          <p className="text-lg font-semibold">You have not created any events yet</p>
          <p className="mt-1 opacity-70">Create your first event to manage it here.</p>
          <Link href="/create-event" className="btn btn-primary mt-5">
            Create Event
          </Link>
        </div>
      )}

      {events && events.length > 0 && (
        <div className="mt-8 overflow-x-auto rounded-box border border-base-300 bg-base-100">
          <table className="table">
            <thead>
              <tr>
                <th>Event</th>
                <th>Type</th>
                <th>Date</th>
                <th>Location</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={event.thumbnail}
                        alt={event.title}
                        className="h-12 w-16 rounded object-cover"
                      />
                      <span className="font-semibold">{event.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline">{event.eventType}</span>
                  </td>
                  <td className="whitespace-nowrap">
                    {formatEventDate(event.date)}
                    {event.date < today && (
                      <span className="badge badge-ghost ml-2">Past</span>
                    )}
                  </td>
                  <td>{event.location}</td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/events/${event._id}`}
                        className="btn btn-ghost btn-sm"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => setEditing(event)}
                        className="btn btn-outline btn-primary btn-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleting(event)}
                        className="btn btn-outline btn-error btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <EditEventModal
          key={editing._id}
          event={editing}
          onClose={() => setEditing(null)}
          onSaved={handleSaved}
        />
      )}

      {deleting && (
        <dialog className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-xl font-bold">Delete this event?</h3>
            <p className="mt-3 opacity-80">
              &quot;{deleting.title}&quot; will be permanently deleted, and people
              who joined it will no longer see it. This cannot be undone.
            </p>
            <div className="modal-action">
              <button
                onClick={() => setDeleting(null)}
                className="btn btn-ghost"
                disabled={deleteBusy}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="btn btn-error"
                disabled={deleteBusy}
              >
                {deleteBusy ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
          <div
            className="modal-backdrop bg-black/40"
            onClick={deleteBusy ? undefined : () => setDeleting(null)}
          />
        </dialog>
      )}
    </main>
  );
}