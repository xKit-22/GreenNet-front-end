import {EventCard} from "./EventCard";

export const EventsList = (props) => {
    return (
        <div className="events-card-list">
            {
                props.allEvents.map(el => {
                    return <EventCard key={el.id} event={el}/>
                })
            }
        </div>
    )

}