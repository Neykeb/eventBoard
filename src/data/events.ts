export type EventStatus = "draft" | "published" | "cancelled" | "completed";

export type EventCategory = "workshop" | "talk" | "networking" | "review" | "other";

// NEU: Einheitliche Sprache - technische Werte erhalten deutsche UI-Texte.
export const eventStatusLabels: Record<EventStatus, string> = {
  draft: "Entwurf",
  published: "Veröffentlicht",
  cancelled: "Abgesagt",
  completed: "Abgeschlossen",
};

export const eventCategoryLabels: Record<EventCategory, string> = {
  workshop: "Workshop",
  talk: "Vortrag",
  networking: "Netzwerken",
  review: "Feedback",
  other: "Sonstiges",
};

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
    title: "React-Grundlagen-Workshop",
    description: "Ein praktischer Workshop über Komponenten, Props und State.",
    date: "2026-06-24",
    time: "10:00",
    location: "Raum A",
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
    title: "Portfolio-Feedback-Tag",
    description: "Teilnehmende erhalten Feedback zu ihren Entwicklerportfolios.",
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
