import { createFileRoute } from "@tanstack/react-router";
import { initialEvents } from "../../data/initialEvents";
import { EventCard } from "../../components/eventCard";
import { useState } from "react";

export const Route = createFileRoute("/events/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setselectedSort] = useState("");

  function changeHandler(e: any) {
    setSearch(e.target.value);
  }
  function changeHandlerStatus(e: any) {
    setSelectedStatus(e.target.value);
  }
  function changeHandlerCategory(e: any) {
    setSelectedCategory(e.target.value);
  }
  function changeHandlerSort(e: any) {
    setselectedSort(e.target.value);
  }

  const initialEventsFilter = initialEvents.filter((singleEvent) => {
    const textExists = singleEvent.title
      .toLowerCase()
      .includes(search.toLowerCase());

    // Dieser Block hat mich auseinander genommen :)
    if (
      // singleEvent.status => aktuelle Status aus: initialEvents
      // selectedStatus => ausgewhälte Status vom User, lawatze
      textExists && // ...ob der Suchtext im Text vorkommt!
      (selectedStatus === "" || singleEvent.status === selectedStatus) &&
      (selectedCategory === "" || singleEvent.category === selectedCategory)
    ) {
      return true;
    }
  });

  // Date sorting
  const sortedEvents = [...initialEventsFilter].sort((a, b) => {
    if (selectedSort === "alphabet") {
      return a.title.localeCompare(b.title); 
    }
    if (selectedSort === "date-descending") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    // default: date-ascending
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  return (
    <>
      <section>
        <input
          type="text"
          placeholder="Texteingabe"
          onChange={changeHandler}
          value={search}
        />

        <label htmlFor="eventStatus">Status</label>
        <select
          name="status"
          id="event"
          onChange={changeHandlerStatus}
          value={selectedStatus}
        >
          <option value="">All Status</option>
          <option value="draft">draft</option>
          <option value="published">published</option>
          <option value="cancelled">cancelled</option>
          <option value="completed">completed</option>
        </select>

        <label htmlFor="eventCategory">Category</label>
        <select
          name="category"
          id="event"
          onChange={changeHandlerCategory}
          value={selectedCategory}
        >
          <option value="">All Categories</option>
          <option value="workshop">workshop</option>
          <option value="talk">talk</option>
          <option value="networking">networking</option>
          <option value="review">review</option>
          <option value="other">other</option>
        </select>

        <label htmlFor="sort">Sort</label>
        <select
          name="sort"
          id="sort"
          onChange={changeHandlerSort}
          value={selectedSort}
        >
          <option value="date-ascending">datumAufsteigend</option>
          <option value="date-descending">datumAbsteigend</option>
          <option value="alphabet">A-Z</option>
        </select>
      </section>

      {sortedEvents.map((element) => {
        return (
          <EventCard
            key={element.id}
            id={element.id}
            title={element.title}
            description={element.description}
            date={element.date}
            time={element.time}
            location={element.location}
            category={element.category}
            status={element.status}
            maxAttendees={element.maxAttendees}
            attendees={element.attendees}
            createdAt={element.createdAt}
          />
        );
      })}
    </>
  );
}
