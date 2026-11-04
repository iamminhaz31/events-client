import SectionHeading from "../SectionHeading";

const seeds = ["gallery1", "gallery2", "gallery3", "gallery4", "gallery5", "gallery6"];

export default function Gallery() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Moments from the Community"
          subtitle="A glimpse of the work our volunteers do together."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {seeds.map((seed) => (
            <div
              key={seed}
              className="aspect-[4/3] overflow-hidden rounded-box bg-base-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://picsum.photos/seed/${seed}/800/600`}
                alt="Community service event"
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}