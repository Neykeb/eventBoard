import { useEffect, useState } from "react";
import { initialEvents } from "../data/initialEvents";
import type { Attendee, Event } from "../data/initialEvents";

export function useEvents() {

  //1 hier wollen wir erst nachschauen ob localStorage etwas gespeichert hat. Deshalb übergeben wir eine Funktion.
  const [events, setEvents] = useState(() => {
    const saveData = localStorage.getItem("events");
    if (saveData) {
      return JSON.parse(saveData);
    }
    return initialEvents;
  });

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  function createEvent(newEvent: Event) {
    setEvents([...events, newEvent]);
  }

  function deleteEvent(id: string) {
    setEvents(
      events.filter((event: Event) => {
        return event.id !== id;
      }),
    );
  }
                        
  function updateEvent(updatedEvent: Event) {
    setEvents(
      events.map((item: Event) => {
        if (item.id === updatedEvent.id) {
          return updatedEvent;
        } else {
          return item;
        }
      }),
    );
  }

  function addAttendee(eventId: string, newAttendee: Attendee) {
    setEvents(
      events.map((item: Event) => {
        if (item.id === eventId) {
          return { ...item, attendees: [...item.attendees, newAttendee] };
        } else {
          return item;
        }
      }),
    );
  }

  return { events, createEvent, deleteEvent, updateEvent, addAttendee };
}
