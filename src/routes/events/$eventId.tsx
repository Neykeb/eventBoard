import { createFileRoute, Link } from '@tanstack/react-router'
import { initialEvents } from '../../data/initialEvents'

export const Route = createFileRoute('/events/$eventId')({
  component: RouteComponent,
})

function RouteComponent() {

  const {eventId} = Route.useParams()
  //Einzelne Events durchgehen und sie als e benennen.
  //Es gibt in der initialEvents nur zwei Events. 
  const eventFound = initialEvents.find((e)=>{
    return e.id === eventId
  })

  if (eventFound === undefined){
    
    return (
      <>
        <p>Error! Event not found.</p>
        
          <Link to="/events" className="btn btn-ghost bg-mist-500">
            Zurück zur Übersicht
          </Link>
        
      </>
    );
  }

 //Hier wird durch jeden Event bzw. durch jeden Teilnehmer durchgegangen und auf jedes Element Zugriff verschaffen, Bratan.
   const details = eventFound.attendees.map((attendees)=>{
      return (
        <div key={attendees.id}>
        <p>{attendees.id}</p>
        <p>{attendees.name}</p>
        <p>{attendees.email}</p>
        </div>
      )
    })
 
  
  return (
    <>
      <p>Event-ID: {eventId}</p>
      <p>Title: {eventFound.title}</p>
      <p>Description: {eventFound.description}</p>
      <p>Date: {eventFound.date}</p>
      <p>Time: {eventFound.time}</p>
      <p>Location: {eventFound.location}</p>
      <p>Category: {eventFound.category}</p>
      <p>Status: {eventFound.status}</p>
      <p>Max Attendees: {eventFound.maxAttendees}</p>
      <p>Attendees: {eventFound.attendees.length}</p>
      <p>Created at: {eventFound.createdAt}</p>
      <div>{details}</div>
    </>
  );
}
