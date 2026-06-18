export type EventStatus = "draft" | "published" | "cancelled" | "completed";

export type EventCategory = "workshop" | "talk" | "networking" | "review" | "other";

export type Attendee = {
  id: string;
  name: string;
  email: string;
};

export type Event = {
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

export const initialEvents: Event[] = [
  {
    id: "react-workshop",
    title: "React Basics Workshop",
    description: "A practical workshop about components, props and state.",
    date: "2026-06-24",
    time: "10:00",
    location: "Room A",
    category: "workshop",
    status: "published",
    maxAttendees: 16,
    attendees: [
      {
        id: "attendee-1",
        name: "Sarah Miller",
        email: "sarah@example.com",
      },
    ],
    createdAt: "2026-06-17",
  },
  {
    id: "portfolio-review",
    title: "Portfolio Review Day",
    description: "Students can receive feedback on their developer portfolios.",
    date: "2026-06-26",
    time: "13:00",
    location: "Online",
    category: "review",
    status: "draft",
    maxAttendees: 10,
    attendees: [
      { id: "attendee-2", name: "Skindrak", email: "pipindrak@example.com" },
    ],
    createdAt: "2026-06-17",
  },
];
