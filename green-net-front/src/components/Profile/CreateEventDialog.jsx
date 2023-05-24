import {useDispatch} from "react-redux";
import {useState} from "react";
import {createPost} from "../../redux/postSlice";
import {changeEventDialogAction} from "../../redux/dialogsSlice";
import closeImg from "../../assets/close.svg";
import PropTypes from "prop-types";
import axios from "axios";
import {login} from "../../redux/userSlice";

export const CreateEventDialog = () => {
    const dispatch = useDispatch();
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateOfStart, setEventDateOfStart] = useState('');
    const [eventDateOfFinish, setEventDateOfFinish] = useState('');
    const [eventPlace, setEventPlace] = useState('');
    const [eventContacts, setEventContacts] = useState('');
    const [eventReward, setEventReward] = useState(0);

    const currUserID = localStorage.getItem('currentUserId')

    const toCreateEvent = (e) => {
        e.preventDefault();
        const data = {
            avatar: "https://img.freepik.com/free-vector/pet-shop-composition_1284-25876.jpg?w=826&t=st=1682953595~exp=1682954195~hmac=2f5d7f0d78153cef622c29fee0a476f990ffefdc7865659c490f24f67e3a85d7",
            name: eventTitle,
            description: eventDescription,
            dateOfStart: new Date(eventDateOfStart).toISOString(),
            dateOfFinish: new Date(eventDateOfFinish).toISOString(),
            place: eventPlace,
            contacts: eventContacts,
            reward: eventReward,
            membersArr: [currUserID],
            adminID: currUserID,
        }

        console.log(data)

        axios.post('http://localhost:3000/events', data).then(res => dispatch(changeEventDialogAction()));

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
                    <input onChange={(e) => setEventTitle(e.target.value)}/>

                    <label htmlFor="">Введите описание события</label>
                    <textarea onChange={(e) => setEventDescription(e.target.value)}/>

                    <label htmlFor="">Введите дату начала</label>
                    <input onChange={(e) => setEventDateOfStart(e.target.value)}/>

                    <label htmlFor="">Введите дату окончания</label>
                    <input onChange={(e) => setEventDateOfFinish(e.target.value)}/>

                    <label htmlFor="">Введите адрес</label>
                    <input onChange={(e) => setEventPlace(e.target.value)}/>

                    <label htmlFor="">Введите контакты</label>
                    <input onChange={(e) => setEventContacts(e.target.value)}/>

                    <label htmlFor="">Введите количество монеток</label>
                    <input onChange={(e) => setEventReward(+e.target.value)}/>

                    {/*<label htmlFor="">Изображение</label>*/}
                    <div className="img-uploader">
                        <button>Загрузить картинку</button>
                    </div>

                    <button onClick={(e) => toCreateEvent(e)}>Создать событие</button>
                </div>
            </div>
        </div>
    )
}
