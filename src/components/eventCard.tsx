import type { EventCategory, EventStatus, Attendee } from "../data/initialEvents";
import { Link } from "@tanstack/react-router";
type EventCardProps = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: EventCategory;
  status: EventStatus;
  maxAttendees: number;
  attendees: Attendee[];
  createdAt: string;
};

export function EventCard({
  id,
  title,
  date,
  time,
  location,
  category,
  status,
  attendees,
}: EventCardProps) {
  return (
    <>
      <div>
        <h1>Title: {title}</h1>
        <h1>Date: {date}</h1>
        <h1>Time: {time}</h1>
        <h1>Location: {location}</h1>
        <h1>Category: {category}</h1>
        <h1>status: {status}</h1>
        <h1>Attendees: {attendees.length}</h1>
        <div className="mt-5">
          <Link
            to="/events/$eventId"
            className="bg-[#AF495B] py-1 px-2 rounded-md"
            params={{ eventId: id }}
          >
            Details sehen
          </Link>
        </div>
      </div>
    </>
  );
}
