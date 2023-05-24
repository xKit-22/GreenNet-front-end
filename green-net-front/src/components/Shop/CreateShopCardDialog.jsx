import {useDispatch} from "react-redux";
import {useState} from "react";
import {createPost} from "../../redux/postSlice";
import {changeEventDialogAction, changeShopCardDialogAction} from "../../redux/dialogsSlice";
import closeImg from "../../assets/close.svg";
import PropTypes from "prop-types";
import axios from "axios";
import {login} from "../../redux/userSlice";

export const CreateShopCardDialog = () => {
    const dispatch = useDispatch();
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    const [eventDateOfStart, setEventDateOfStart] = useState('');
    const [eventDateOfFinish, setEventDateOfFinish] = useState('');
    const [eventPlace, setEventPlace] = useState('');
    const [eventContacts, setEventContacts] = useState('');
    const [eventReward, setEventReward] = useState(0);

    const currUserID = localStorage.getItem('currentUserId')


    return (
        <div className="createpost">
            <div className="createpost-container">
                <div className="close-button">
                    <img src={closeImg} alt="close button" onClick={() => dispatch(changeShopCardDialogAction())} />
                </div>
                <h2>Создайте карточку</h2>

                <div className="post-inputs">
                    <label htmlFor="">Введите название</label>
                    <input onChange={(e) => setEventTitle(e.target.value)}/>

                    <label htmlFor="">Введите описание карточки</label>
                    <textarea onChange={(e) => setEventDescription(e.target.value)}/>

                    <label htmlFor="">Введите дату истечения срока</label>
                    <input onChange={(e) => setEventDateOfStart(e.target.value)}/>

                    <label htmlFor="">Введите стоимость</label>
                    <input onChange={(e) => setEventDateOfFinish(e.target.value)}/>


                    {/*<label htmlFor="">Изображение</label>*/}
                    <div className="img-uploader">
                        <button>Загрузить картинку</button>
                    </div>

                    <button>Создать событие</button>
                </div>
            </div>
        </div>
    )
}
