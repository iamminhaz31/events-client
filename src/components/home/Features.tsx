import SectionHeading from "../SectionHeading";

const features = [
  {
    icon: "📝",
    title: "Create Events",
    text: "Organize cleanups, plantation drives and donation camps in just a few minutes.",
  },
  {
    icon: "🤝",
    title: "Join with One Click",
    text: "Browse upcoming events near you and join the ones you care about instantly.",
  },
  {
    icon: "📅",
    title: "Track Your Events",
    text: "See the events you joined sorted by date, and manage the ones you created.",
  },
  {
    icon: "🔒",
    title: "Safe and Private",
    text: "Secure login keeps your account safe, and only you can edit or delete your events.",
  },
];

export default function Features() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Why NeighborHub"
          subtitle="Everything you need to bring your community together for a good cause."
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card h-full bg-base-100 shadow-md">
              <div className="card-body items-center text-center">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="card-title">{f.title}</h3>
                <p className="opacity-80">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}