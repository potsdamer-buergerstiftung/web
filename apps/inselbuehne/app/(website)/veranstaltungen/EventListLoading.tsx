import EventCardLoading from "@components/ProjectCardLoading";

export default function EventListLoading() {
  return (
    <div className="space-y-10">
      {Array.from({ length: 3 }).map((_, i) => (
        <EventCardLoading key={i} />
      ))}
    </div>
  );
}
