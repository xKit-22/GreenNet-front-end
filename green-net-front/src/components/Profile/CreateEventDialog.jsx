import { useDispatch } from "react-redux";
import {useEffect, useState} from "react";
import { createPost } from "../../redux/postSlice";
import { changeEventDialogAction } from "../../redux/dialogsSlice";
import closeImg from "../../assets/close.svg";
import PropTypes from "prop-types";
import axios from "axios";
import { login } from "../../redux/userSlice";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import AdapterDateFns from "@mui/x-date-pickers/AdapterDateFns";
import 'dayjs/locale/ru';
import { createEventMarker } from "../Map/mapMethods";
import { geocodeAddress } from "../Map/mapMethods";
import { createMarker } from "../../redux/mapSlice";
import { markerTypes } from "../Map/markersTypes";
import qr from "qrcode";

export const CreateEventDialog = () => {
    const dispatch = useDispatch();
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateOfStart, setEventDateOfStart] = useState('');
    const [eventDateOfFinish, setEventDateOfFinish] = useState('');
    const [eventPlace, setEventPlace] = useState('');
    const [eventContacts, setEventContacts] = useState('');
    const [eventReward, setEventReward] = useState(0);
    const [QRurl, setQRurl] = useState('')
    const [keyWords, setKeyWords] = useState([])

    const currUserID = localStorage.getItem('currentUserId')

    const handleEventDateOfStartChange = (date) => {
        setEventDateOfStart(date);
    };

    const handleEventDateOfFinishChange = (date) => {
        setEventDateOfFinish(date);
    };

    function generateRandomWords() {
        const words = [];
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

        for (let i = 0; i < 50; i++) {
            let word = '';
            for (let j = 0; j < 6; j++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                word += characters[randomIndex];
            }
            words.push(word);
        }

        return words;
    }

    useEffect(() => {
        setKeyWords(generateRandomWords())
    }, [])


    useEffect(() => {
        console.log('create event')
        if (keyWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * keyWords.length);
            const text = keyWords[randomIndex]

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

    }, [keyWords])

    const toCreateEvent = (e) => {

        const words = keyWords

        e.preventDefault();
        const data = {
            avatar: "https://img.freepik.com/free-vector/save-the-planet-concept_23-2148520709.jpg?w=740&t=st=1687382581~exp=1687383181~hmac=4999903b749c6c9d62729196993d21ab285d23bab44e6e7188d18ac88b184bd2",
            name: eventTitle,
            description: eventDescription,
            dateOfStart: new Date(eventDateOfStart).toISOString(),
            dateOfFinish: new Date(eventDateOfFinish).toISOString(),
            place: eventPlace,
            contacts: eventContacts,
            reward: eventReward,
            membersArr: [JSON.stringify({ id: currUserID, isMarked: false })],
            adminID: currUserID,
            keyWords: words,
            QRurl: QRurl
        }

        console.log(data)

        axios.post('http://localhost:3000/events', data).then(res => {
            createEventMarker(res.data);
            dispatch(changeEventDialogAction());
        });

    }

    const createEventMarker = async (eventData) => {
        const coordinates = await geocodeAddress(eventData.place);
        const swapCoord = [Object.values(coordinates)[1], Object.values(coordinates)[0]]
        const data = {
            title: eventData.name,
            coordinates: swapCoord,
            type: markerTypes.EVENT.type,
            ownerId: localStorage.getItem('currentUserId'),
            eventId: eventData.id
        }
        console.log('xoxo', data);
        dispatch(createMarker(data));
    }

    return (
        <div className="createpost">
            <div className="createpost-container">
                <div className="close-button">
                    <img src={closeImg} alt="close button" onClick={() => dispatch(changeEventDialogAction())} />
                </div>
                <h2>Создайте событие</h2>

                <div className="post-inputs">
                    <label htmlFor="">Введите название</label>
                    <input onChange={(e) => setEventTitle(e.target.value)} />

                    <label htmlFor="">Введите описание события</label>
                    <textarea onChange={(e) => setEventDescription(e.target.value)} />

                    <label htmlFor="">Введите дату начала</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={eventDateOfStart} onChange={handleEventDateOfStartChange} views={['year', 'month', 'day']} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <label htmlFor="">Введите дату окончания</label>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={eventDateOfFinish} onChange={handleEventDateOfFinishChange} views={['year', 'month', 'day']} />
                        </DemoContainer>
                    </LocalizationProvider>

                    <label htmlFor="">Введите адрес</label>
                    <input onChange={(e) => setEventPlace(e.target.value)} placeholder="Город, Улица, дом" />

                    <label htmlFor="">Введите контакты</label>
                    <input onChange={(e) => setEventContacts(e.target.value)} />

                    <label htmlFor="">Введите количество монеток</label>
                    <input onChange={(e) => setEventReward(+e.target.value)} />

                    {/*<label htmlFor="">Изображение</label>*/}
                    <div className="img-uploader">
                        Загрузить картинку
                        <input type='file' accept="image/*" multiple="false" />
                    </div>

                    <button onClick={(e) => toCreateEvent(e)}>Создать событие</button>
                </div>
            </div>
        </div>
    )
}
