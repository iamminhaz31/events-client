"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function isHttpUrl(value: string) {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export default function ProfilePage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!user) return null;

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const form = new FormData(ev.currentTarget);
    const name = String(form.get("name") || "").trim();
    const photo = String(form.get("photo") || "").trim();

    const found: Record<string, string> = {};
    if (name.length < 2) found.name = "Name must be at least 2 characters";
    if (!isHttpUrl(photo)) found.photo = "Please enter a valid photo URL (https://...)";

    setErrors(found);
    if (Object.keys(found).length > 0) {
      toast.error(Object.values(found)[0]);
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name, image: photo });
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not update your profile");
      return;
    }

    toast.success("Profile updated successfully!");
    router.refresh();
  };

  return (
    <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold">My Profile</h1>
      <p className="mt-2 opacity-70">View and update your name and photo.</p>

      <div className="card mt-8 bg-base-100 shadow-md">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="avatar">
              <div className="w-20 rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={user.image || "https://github.com/iamminhaz31.png"}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm opacity-70">{user.email}</p>
            </div>
          </div>

          <div className="divider" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="form-control">
              <span className="label-text mb-1">Name</span>
              <input
                name="name"
                type="text"
                defaultValue={user.name}
                className="input input-bordered w-full"
              />
              {errors.name && <span className="mt-1 text-sm text-error">{errors.name}</span>}
            </label>

            <label className="form-control">
              <span className="label-text mb-1">Email</span>
              <input
                type="email"
                value={user.email}
                readOnly
                className="input input-bordered w-full opacity-70"
              />
            </label>

            <label className="form-control">
              <span className="label-text mb-1">Photo URL</span>
              <input
                name="photo"
                type="text"
                defaultValue={user.image || ""}
                placeholder="https://..."
                className="input input-bordered w-full"
              />
              {errors.photo && <span className="mt-1 text-sm text-error">{errors.photo}</span>}
            </label>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}