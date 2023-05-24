import {EventCard} from "./EventCard";
import './eventsList.scss'
import {useState} from "react";

export const MyEventsList = (props) => {

    const currentUserID = localStorage.getItem('currentUserId')

    const userEvents = props.allEvents.filter(elem => {
        if (props.checkboxValue) {
            return elem.adminID === currentUserID
        }
        return elem.adminID === currentUserID || elem.membersArr.includes(currentUserID)
    })

    console.log('userEvents', userEvents)

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