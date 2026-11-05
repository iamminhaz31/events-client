import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[460px] items-center overflow-hidden md:min-h-[580px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/banner.jpg"
        alt="Volunteers working together in the community"
        className="absolute inset-0 h-full w-full object-cover object-[50%_75%]"
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/45 to-black/10" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-4 py-20">
        <span className="badge badge-primary">Community. Service. Impact.</span>
        <h1 className="max-w-2xl text-4xl font-bold text-white md:text-6xl">
          Small acts of kindness make a big difference
        </h1>
        <p className="max-w-xl text-lg text-white/90">
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