"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { apiFetch, ApiError } from "@/lib/api";
import { EventItem, formatEventDate, todayInDhaka } from "@/lib/types";
import EventDetailsSkeleton from "./EventDetailsSkeleton";

export default function EventDetails() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [event, setEvent] = useState<EventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [joined, setJoined] = useState(false);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    apiFetch<EventItem>(`/events/${id}`)
      .then(setEvent)
      .catch((e: ApiError) =>
        setError(e.status === 404 ? "Event not found" : e.message)
      )
      .finally(() => setLoading(false));
  }, [id]);

  // When a user is logged in, check if they already joined this event
  useEffect(() => {
    if (!session) {
      setJoined(false);
      return;
    }
    apiFetch<{ joined: boolean }>(`/events/${id}/join-status`, { auth: true })
      .then((res) => setJoined(res.joined))
      .catch(() => {});
  }, [session, id]);

  const handleJoin = async () => {
    if (!session) {
      toast.error("Please login to join this event");
      router.push("/login");
      return;
    }

    setJoining(true);
    try {
      await apiFetch(`/events/${id}/join`, { method: "POST", auth: true });
      setJoined(true);
      toast.success("You joined this event!");
    } catch (e) {
      const err = e as ApiError;
      if (err.status === 409) setJoined(true);
      toast.error(err.message || "Could not join the event");
    } finally {
      setJoining(false);
    }
  };

  if (loading) return <EventDetailsSkeleton />;

  if (error || !event) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold">{error || "Event not found"}</h1>
        <p className="mt-2 opacity-70">
          This event may have been removed or the link is incorrect.
        </p>
        <button
          onClick={() => router.push("/events")}
          className="btn btn-primary mt-6"
        >
          Back to Upcoming Events
        </button>
      </main>
    );
  }

  const isPast = event.date < todayInDhaka();
  const isOwner = session?.user.email === event.creatorEmail;

  let buttonLabel = "Join Event";
  if (isPast) buttonLabel = "Event has passed";
  else if (joined) buttonLabel = "You have joined";
  else if (joining) buttonLabel = "Joining...";

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="overflow-hidden rounded-box bg-base-100 shadow-md">
        <div className="h-72 w-full bg-base-200 md:h-96">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={event.thumbnail}
            alt={event.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5 p-6 md:p-8">
          <span className="badge badge-primary badge-outline">
            {event.eventType}
          </span>

          <h1 className="text-3xl font-bold">{event.title}</h1>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <p>
              <span className="font-semibold">📅 Date:</span>{" "}
              {formatEventDate(event.date)}
            </p>
            <p>
              <span className="font-semibold">📍 Location:</span>{" "}
              {event.location}
            </p>
            <p>
              <span className="font-semibold">👤 Organizer:</span>{" "}
              {event.creatorName || event.creatorEmail}
            </p>
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">About this event</h2>
            <p className="whitespace-pre-line opacity-80">
              {event.description}
            </p>
          </div>

          {isOwner && (
            <div className="alert alert-info">
              <span>You created this event.</span>
            </div>
          )}

          <button
            onClick={handleJoin}
            disabled={isPast || joined || joining || isPending}
            className="btn btn-primary w-full sm:w-auto"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </main>
  );
}