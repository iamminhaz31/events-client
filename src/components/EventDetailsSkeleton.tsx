export default function EventDetailsSkeleton() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <div className="space-y-6">
        <div className="skeleton h-72 w-full" />
        <div className="skeleton h-6 w-28" />
        <div className="skeleton h-9 w-2/3" />
        <div className="skeleton h-5 w-1/3" />
        <div className="skeleton h-24 w-full" />
      </div>
    </main>
  );
}
