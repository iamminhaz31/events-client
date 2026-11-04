import { Suspense } from "react";
import EventDetails from "@/components/EventDetails";
import EventDetailsSkeleton from "@/components/EventDetailsSkeleton";

export default function EventDetailsPage() {
  return (
    <Suspense fallback={<EventDetailsSkeleton />}>
      <EventDetails />
    </Suspense>
  );
}