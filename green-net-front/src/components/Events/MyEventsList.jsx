import {EventCard} from "./EventCard";


export const MyEventsList = (props) => {

    const currentUserID = localStorage.getItem('currentUserId')

    const userEvents = props.allEvents.filter(elem => {
        console.log('elem.adminID', elem)
        return elem.adminID === currentUserID
    })

    console.log('userEvents', userEvents)

    return (
        <div className="events-card-list">
            {
                userEvents.map(el => {
                    return <EventCard key={el.id} event={el}/>
                })
            }
        </div>
    )

}