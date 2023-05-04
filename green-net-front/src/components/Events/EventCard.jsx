import coin from "../../assets/coin.png";
import './eventCard.scss'

let moment = require('moment');

export const EventCard = ({event}) => {
    return (
        <div className="event-card-main-container">
            <div className="event-card-left-container">
                <div>
                    <img src={event.img} alt="аватар события"/>
                </div>
                <div className="info-container">
                    <h3>{event.name}</h3>
                    <p>Дата начала: {moment(`${event.dateOfStart}`).format('YYYY.MM.DD')}</p>
                    <p>Дата окончания: {moment(`${event.dateOfFinish}`).format('YYYY.MM.DD')}</p>
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