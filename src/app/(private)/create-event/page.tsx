"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiFetch, ApiError } from "@/lib/api";
import { EVENT_TYPES, todayInDhaka } from "@/lib/types";

type Errors = Record<string, string>;

function isHttpUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const today = todayInDhaka();

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);

    const values = {
      title: String(form.get("title") || "").trim(),
      description: String(form.get("description") || "").trim(),
      eventType: String(form.get("eventType") || ""),
      thumbnail: String(form.get("thumbnail") || "").trim(),
      location: String(form.get("location") || "").trim(),
      date: String(form.get("date") || ""),
    };

    const found: Errors = {};
    if (values.title.length < 3) found.title = "Title must be at least 3 characters";
    if (values.description.length < 10)
      found.description = "Description must be at least 10 characters";
    if (!values.eventType) found.eventType = "Please choose an event type";
    if (!isHttpUrl(values.thumbnail))
      found.thumbnail = "Please enter a valid image URL (https://...)";
    if (values.location.length < 3) found.location = "Please enter a location";
    if (!values.date) found.date = "Please choose an event date";
    else if (values.date < today) found.date = "Event date cannot be in the past";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setLoading(true);
    try {
      await apiFetch("/events", { method: "POST", body: values, auth: true });
      toast.success("Event created successfully!");
      router.push("/events");
    } catch (e) {
      const err = e as ApiError;
      if (err.errors) {
        setErrors(err.errors);
        toast.error(Object.values(err.errors)[0]);
      } else {
        toast.error(err.message || "Could not create the event");
      }
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">Create Event</h1>
      <p className="mt-2 opacity-70">
        Organize a community service event and invite others to join.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <label className="form-control">
          <span className="label-text mb-1">Title</span>
          <input
            name="title"
            type="text"
            placeholder="Winter Clothes Distribution"
            className="input input-bordered w-full"
          />
          {errors.title && <span className="mt-1 text-sm text-error">{errors.title}</span>}
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Description</span>
          <textarea
            name="description"
            rows={4}
            placeholder="Tell people what this event is about and what to bring"
            className="textarea textarea-bordered w-full"
          />
          {errors.description && (
            <span className="mt-1 text-sm text-error">{errors.description}</span>
          )}
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Event Type</span>
          <select name="eventType" defaultValue="" className="select select-bordered w-full">
            <option value="" disabled>
              Choose a type
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {errors.eventType && (
            <span className="mt-1 text-sm text-error">{errors.eventType}</span>
          )}
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Thumbnail Image URL</span>
          <input
            name="thumbnail"
            type="text"
            placeholder="https://..."
            className="input input-bordered w-full"
          />
          {errors.thumbnail && (
            <span className="mt-1 text-sm text-error">{errors.thumbnail}</span>
          )}
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Location</span>
          <input
            name="location"
            type="text"
            placeholder="Mirpur 10, Dhaka"
            className="input input-bordered w-full"
          />
          {errors.location && (
            <span className="mt-1 text-sm text-error">{errors.location}</span>
          )}
        </label>

        <label className="form-control">
          <span className="label-text mb-1">Event Date</span>
          <input
            name="date"
            type="date"
            min={today}
            className="input input-bordered w-full"
          />
          {errors.date && <span className="mt-1 text-sm text-error">{errors.date}</span>}
        </label>

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Event"}
        </button>
      </form>
    </main>
  );
}