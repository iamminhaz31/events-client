import SectionHeading from "../SectionHeading";

const photos = [
  { src: "/images/gallery1.jpg", alt: "Volunteers packing food boxes" },
  { src: "/images/gallery2.jpg", alt: "Volunteers sorting donated food" },
  { src: "/images/gallery3.jpg", alt: "Community members gathering outdoors" },
  { src: "/images/gallery4.jpg", alt: "Hands holding a small donation" },
  { src: "/images/gallery5.jpg", alt: "Volunteer wearing a Love Your Neighbour cap" },
  { src: "/images/gallery6.jpg", alt: "Community is strength sign" },
];

export default function Gallery() {
  return (
    <section className="bg-base-200 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeading
          title="Moments from the Community"
          subtitle="A glimpse of the work our volunteers do together."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.src}
              className="aspect-4/3 overflow-hidden rounded-box bg-base-300"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}