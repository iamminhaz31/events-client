"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
    toast.success("Logout successful");
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-7xl px-4">
        <div className="navbar-start">
          <Link href="/" className="text-xl font-bold text-primary sm:text-2xl">
            NeighborHub
          </Link>
        </div>

        <div className="navbar-center hidden sm:flex">
          <Link href="/events" className="btn btn-ghost">
            Upcoming Events
          </Link>
        </div>

        <div className="navbar-end gap-1 sm:gap-2">
          <Link href="/events" className="btn btn-ghost btn-sm sm:hidden">
            Events
          </Link>

          <ThemeToggle />

          {isPending ? (
            <span className="skeleton h-10 w-10 rounded-full" />
          ) : user ? (
            <>
              <div className="dropdown dropdown-end">
                <div className="tooltip tooltip-bottom" data-tip={user.name}>
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={user.image || "https://github.com/iamminhaz31.png"}
                        alt={user.name}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-10 mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
                >
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link href="/create-event">Create Event</Link>
                  </li>
                  <li>
                    <Link href="/manage-events">Manage Events</Link>
                  </li>
                  <li>
                    <Link href="/joined-events">Joined Events</Link>
                  </li>
                </ul>
              </div>
              <button onClick={handleLogout} className="btn btn-primary btn-sm">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}