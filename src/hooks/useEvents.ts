import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { Attendee, Event } from "../data/events";

type EventsContextValue = {
  events: Event[];
  isLoading: boolean;
  error: string | null;
  retry: () => Promise<void>;
  createEvent: (newEvent: Event) => void;
  deleteEvent: (id: string) => void;
  updateEvent: (updatedEvent: Event) => void;
  addAttendee: (eventId: string, newAttendee: Attendee) => void;
};

const EventsContext = createContext<EventsContextValue | null>(null);

const eventCategories = ["workshop", "talk", "networking", "review", "other"];
const eventStatuses = ["draft", "published", "cancelled", "completed"];

// NEU: Datenvalidierung - prüft JSON- und LocalStorage-Daten zur Laufzeit.
function isEvent(value: unknown): value is Event {
  if (!value || typeof value !== "object") return false;
  const event = value as Record<string, unknown>;

  return (
    typeof event.id === "string" &&
    typeof event.title === "string" &&
    typeof event.description === "string" &&
    typeof event.date === "string" &&
    typeof event.time === "string" &&
    typeof event.location === "string" &&
    typeof event.category === "string" &&
    eventCategories.includes(event.category) &&
    typeof event.status === "string" &&
    eventStatuses.includes(event.status) &&
    typeof event.maxAttendees === "number" &&
    Array.isArray(event.attendees) &&
    event.attendees.every((attendee) => {
      if (!attendee || typeof attendee !== "object") return false;
      const item = attendee as Record<string, unknown>;
      return (
        typeof item.id === "string" &&
        typeof item.name === "string" &&
        typeof item.email === "string"
      );
    }) &&
    typeof event.createdAt === "string"
  );
}

function parseEvents(value: unknown): Event[] {
  if (!Array.isArray(value) || !value.every(isEvent)) {
    throw new Error("Die Eventdaten besitzen ein ungültiges Format.");
  }
  return value;
}

export function EventsProvider({ children }: { children: ReactNode }) {
  // NEU: Gemeinsamer Event-State - alle Routen verwenden dieselben Daten.
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadEvents = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/events.json", {
        headers: { Accept: "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Events konnten nicht geladen werden (${response.status}).`);
      }

      const eventsFromJson = parseEvents(await response.json());
      const savedEvents = localStorage.getItem("events");

      if (!savedEvents) {
        setEvents(eventsFromJson);
      } else {
        // NEU: Sicheres JSON.parse - beschädigte Daten fallen auf events.json zurück.
        try {
          setEvents(parseEvents(JSON.parse(savedEvents)));
        } catch {
          localStorage.removeItem("events");
          setEvents(eventsFromJson);
        }
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Events konnten nicht geladen werden.",
      );
    } finally {
      setIsLoading(false);
      setHasLoaded(true);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => void loadEvents(), 0);
    return () => window.clearTimeout(timeoutId);
  }, [loadEvents]);

  useEffect(() => {
    if (hasLoaded && !error) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events, error, hasLoaded]);

  // NEU: Funktionale Updates - arbeiten immer mit dem aktuellsten State.
  function createEvent(newEvent: Event) {
    setEvents((currentEvents) => [...currentEvents, newEvent]);
  }

  function deleteEvent(id: string) {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id),
    );
  }

  function updateEvent(updatedEvent: Event) {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  }

  function addAttendee(eventId: string, newAttendee: Attendee) {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === eventId
          ? { ...event, attendees: [...event.attendees, newAttendee] }
          : event,
      ),
    );
  }

  return createElement(
    EventsContext.Provider,
    {
      value: {
        events,
        isLoading,
        error,
        retry: loadEvents,
        createEvent,
        deleteEvent,
        updateEvent,
        addAttendee,
      },
    },
    children,
  );
}

export function useEvents() {
  const context = useContext(EventsContext);
  if (!context) {
    throw new Error("useEvents muss innerhalb des EventsProvider verwendet werden.");
  }
  return context;
}
