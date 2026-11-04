import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://picsum.photos/seed/communityhero/1600/700"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-24 md:py-32">
        <span className="badge badge-primary">Community. Service. Impact.</span>
        <h1 className="max-w-2xl text-4xl font-bold text-white md:text-6xl">
          Small acts of kindness make a big difference
        </h1>
        <p className="max-w-xl text-lg text-white/85">
          Join neighbors in your area to clean up, plant trees, donate winter
          clothes and support families in need. Find an event or start your own.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/events" className="btn btn-primary">
            Explore Events
          </Link>
          <Link
            href="/create-event"
            className="btn btn-outline border-white text-white hover:bg-white hover:text-black"
          >
            Create an Event
          </Link>
        </div>
      </div>
    </section>
  );
}