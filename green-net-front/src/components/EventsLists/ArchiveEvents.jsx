import {EventCard} from "./EventCard";


export const ArchiveEvents = (props) => {
    const currentUserID = localStorage.getItem('currentUserId')

    const userEvents = props.allEvents.filter(elem => {
        return new Date(elem.dateOfFinish) < new Date()
    })

    return (
        <div className="my-events-card-list">
            {
                userEvents.map(el => {
                    return <EventCard key={el.id} event={el}/>
                })
            }
        </div>
    )
}