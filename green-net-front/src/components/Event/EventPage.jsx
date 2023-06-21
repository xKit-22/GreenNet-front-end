import './eventPage.scss'
import coin from "../../assets/coin.png";
import {useEffect, useState} from "react";
import axios from "axios";
import {notificationService} from "../../config/notificationConfig";
import {login} from "../../redux/userSlice";
import * as React from "react";
import UsersListModal from "./UsersListModal";
//import QRCode from 'qrcode'

let moment = require('moment');
const qr = require('qrcode');

export const EventPage = () => {

    const [event, setEvent] = useState([])
    const [countMembers, setCountMembers] = useState(0)
    const [isMember, setIsMember] = useState(false)
    const [isMarked, setIsMarked] = useState(false)
    const [QRurl, setQRurl] = useState('')
    const [inputErrorCaption, setInputErrorCaption] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const url = window.location.href
    const eventId = url.split("/").pop();
    const currentUserId = localStorage.getItem('currentUserId')
    const isAuthor = event.adminID === currentUserId
    const isOver = new Date(event.dateOfFinish) < new Date()

    const [showUserList, setShowUserList] = useState(false);

    const handleClickShowUserList = () => {
        setShowUserList(!showUserList);
    };

    useEffect(() => {
        axios.get(`http://localhost:3000/events/${eventId}`).then(res => {
            setEvent(res.data)
            setCountMembers(res.data.membersArr.length)
            setIsMember(res.data.membersArr.some(item => {
                const itemJSON = JSON.parse(item)
                return itemJSON.id === currentUserId
            }))
            setIsMarked(res.data.membersArr.some(item => {
                const itemJSON = JSON.parse(item)
                return itemJSON.id === currentUserId && itemJSON.isMarked
            }))
        });
    }, [isMarked])

    const onSubscribeEvent = () => {
        if (isMember) {
            axios.post(`http://localhost:3000/events/unsubscribe`, {
                id: eventId,
                currentUserId: currentUserId
            })
            setCountMembers(countMembers - 1)
            notificationService.success(`Вы не участвуете в событии "${event.name}"`);
        } else {
            axios.post(`http://localhost:3000/events/subscribe`, {
                id: eventId,
                currentUserId: currentUserId
            })
            setCountMembers(countMembers + 1)
            notificationService.success(`Вы участвуете в событии "${event.name}"`);
        }
        setIsMember(!isMember)
    }

    const deleteEvent = () => {
        axios.delete(`http://localhost:3000/events/${eventId}`)
        notificationService.success(`Событие "${event.name}" удалено`);
        window.location.pathname = '/events';
    }


    useEffect(() => {
        if (event && event.keyWords) {
            const randomIndex = Math.floor(Math.random() * event.keyWords.length);
            const text = event.keyWords[randomIndex]

            const createQR = () => {
                qr.toDataURL(`${text}`, (err, url) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    setQRurl(url)
                });
            }
            createQR()
        }

    }, [event])

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    }

    const handleClick = () => {
        const checkWord = event.keyWords.includes(inputValue)
        setInputErrorCaption(!checkWord)
        if (checkWord) {
            try {
                axios.post('http://localhost:3000/events/mark', {
                    id: event.id,
                    userId: currentUserId
                }).then(res => {
                    setIsMarked(!isMarked)
                    axios.get(`http://localhost:3000/users/${currentUserId}/addCoins/${event.reward}`)
                })
            } catch (error) {
                console.error(error);
            }
        }
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
                            <td className="reward-td">{event.reward}<img className="reward-img" src={coin}
                                                                         alt="монетка"/></td>
                        </tr>
                        <tr>
                            <td><b>Количество участников: </b></td>
                            <td>{countMembers}</td>
                        </tr>
                    </table>
                    {
                        isMember && !isAuthor && !isOver && !isMarked ?
                            <div>
                                <p>Подтвердите участие</p>
                                <input className='input-approve' value={inputValue} onChange={handleInputChange} type='text'/>
                                <button className='btn-approve' onClick={handleClick}>Подтвердить</button>
                                {inputErrorCaption && <p>Неправильный код</p>}
                            </div>
                            : ''
                    }
                    {isMember && isMarked &&
                    <div>
                        <p>Участие подтверждено</p>
                        <p>Вам начислено {`${event.reward}`} <img alt={'coin'} height={`16px`} src={coin}/></p>
                    </div>
                    }
                    {
                        isAuthor ?
                            <img src={QRurl} alt='qr-код'/>
                            :
                            ''
                    }
                </div>
            </div>
            <div>
                <div className="event-page-right">
                    <img src={event.avatar} alt="аватар"/>
                    {
                        isAuthor ? <div className="btns-container">
                                <button onClick={deleteEvent}>Удалить</button>
                                {isOver ?
                                    <button disabled={true}>Отметить участников</button>
                                    :
                                    <button onClick={handleClickShowUserList}>Отметить участников</button>}
                            </div> :
                            isMember ? (
                                isOver || isMarked ? (
                                    <button disabled={true} onClick={onSubscribeEvent}>Не пойду</button>
                                ) : (
                                    <button onClick={onSubscribeEvent}>Не пойду</button>
                                )
                            ) : (
                                isOver ? (
                                    <button disabled={true} onClick={onSubscribeEvent}>Принять участие</button>
                                ) : (
                                    <button onClick={onSubscribeEvent}>Принять участие</button>
                                )
                            )
                    }
                    {
                        isOver && <p>Событие завершено</p>
                    }
                    {/*<p className='money'><b>Вам начислено 500 <img className="reward-img" src={coin} alt="монетка"/> за участие </b></p>*/}
                </div>
            </div>

            {
                showUserList ?
                    <UsersListModal
                        handleClickShowUserList={handleClickShowUserList}
                        open={showUserList}
                        event={event}
                    />
                    :
                    ""
            }

        </div>
    )

}