import './eventPage.scss'
import coin from "../../assets/coin.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {notificationService} from "../../config/notificationConfig";

let moment = require('moment');

export const EventPage = () => {

    const [event, setEvent] = useState([])
    const [countMembers, setCountMembers] = useState(0)
    const [isMember, setIsMember] = useState(false)

    const url = window.location.href
    const eventId = url.split("/").pop();
    const currentUserId = localStorage.getItem('currentUserId')

    useEffect(() => {
        axios.get(`http://localhost:3000/events/${eventId}`).then(res => {
            setEvent(res.data)
            setCountMembers(res.data.membersArr.length)
            setIsMember(res.data.membersArr.includes(currentUserId))
        });
    }, [])

    const onSubscribeEvent = () => {
        if (isMember) {
            axios.post(`http://localhost:3000/events/unsubscribe`, {
                id: eventId,
                currentUserId: currentUserId
            })
            setCountMembers(countMembers-1)
            notificationService.success(`Вы не участвуете в событии "${event.name}"`);
        } else {
            axios.post(`http://localhost:3000/events/subscribe`, {
                id: eventId,
                currentUserId: currentUserId
            })
            setCountMembers(countMembers+1)
            notificationService.success(`Вы участвуете в событии "${event.name}"`);
        }
        setIsMember(!isMember)
    }

    return (
        <div className="event-page-container">
            <div className='event-page-container-left'>
                <h2>{event.name}</h2>
                <div>
                    <table>
                        <tr>
                            <td><b>О мероприятии: </b></td>
                            <td>{event.description}</td>
                        </tr>
                        <tr>
                            <td><b>Дата начала: </b></td>
                            <td>{moment(`${event.dateOfStart}`).format('DD.MM.YYYY')}</td>
                        </tr>
                        <tr>
                            <td><b>Дата окончания: </b></td>
                            <td>{moment(`${event.dateOfFinish}`).format('DD.MM.YYYY')}</td>
                        </tr>
                        <tr>
                            <td><b>Место проведения: </b></td>
                            <td>{event.place}</td>
                        </tr>
                        <tr>
                            <td><b>Контакты организатора: </b></td>
                            <td>{event.contacts}</td>
                        </tr>
                        <tr>
                            <td><b>Награда за участие: </b></td>
                            <td className="reward-td">{event.reward}<img className="reward-img" src={coin} alt="монетка"/></td>
                        </tr>
                        <tr>
                            <td><b>Количество участников: </b></td>
                            <td>{countMembers}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div>
                <div className="event-page-right">
                    <img src={event.avatar} alt="аватар"/>
                    {
                        isMember ? <button disabled={true} onClick={onSubscribeEvent.bind(this)}>Не пойду</button> :
                            <button  onClick={onSubscribeEvent.bind(this)}>Принять участие</button>
                    }
                    <p>Событие завершено</p>
                    <p className='money'><b>Вам начислено 500 <img className="reward-img" src={coin} alt="монетка"/> за участие </b></p>
                </div>
            </div>
        </div>
    )

}