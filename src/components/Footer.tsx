import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <h3 className="text-2xl font-bold text-white">NeighborHub</h3>
          <p className="mt-3 text-sm opacity-80">
            Ekta community platform jekhane tumi samajik seba mulok event
            create korte, join korte ar track korte paro. Shobai mile
            amader para, amader shohor.
          </p>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-sm opacity-80">
            <li>
              <Link href="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline">Upcoming Events</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">Terms of Service</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-3 font-semibold text-white">Contact</h4>
          <p className="text-sm opacity-80">Dhaka, Bangladesh</p>
          <p className="mb-4 text-sm opacity-80">minhajultanjil143@gmail.com</p>

          <div className="flex gap-3">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="btn btn-circle btn-sm btn-outline border-neutral-content text-neutral-content hover:bg-white hover:text-black"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://github.com/iamminhaz31"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="btn btn-circle btn-sm btn-outline border-neutral-content text-neutral-content hover:bg-white hover:text-black"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.51 11.51 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm opacity-70">
        © 2026 NeighborHub. All rights reserved.
      </div>
    </footer>
  );
}