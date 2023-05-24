import coin from "../../assets/coin.png";
import './eventCard.scss'

let moment = require('moment');

export const EventCard = ({event}) => {
    return (
        <div className="event-card-main-container">
            <div className="event-card-left-container">
                <div>
                    <img src={event.avatar} alt="аватар события"/>
                </div>
                <div className="info-container">
                    <h3><a href={`/events/${event.id}`}>{event.name}</a></h3>
                    <p>Дата начала: {moment(`${event.dateOfStart}`).format('DD.MM.YYYY')}</p>
                    <p>Дата окончания: {moment(`${event.dateOfFinish}`).format('DD.MM.YYYY')}</p>
                    <p>Место: {event.place}</p>
                </div>
            </div>
            <div className="reward-container">
                <p>Награда</p>
                <div className="reward-info">
                    <p><b>{event.reward}</b></p><img src={coin} alt="монетка"/>
                </div>
            </div>
        </div>
    )
}