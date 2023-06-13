import {useDispatch} from "react-redux";
import {useState} from "react";
import {createPost} from "../../redux/postSlice";
import {changeEventDialogAction, changeShopCardDialogAction} from "../../redux/dialogsSlice";
import closeImg from "../../assets/close.svg";
import PropTypes from "prop-types";
import axios from "axios";
import {login} from "../../redux/userSlice";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


export const CreateShopCardDialog = () => {
    const dispatch = useDispatch();
    const [cardTitle, setCardTitle] = useState('');
    const [cardDescription, setCardDescription] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [cardCost, setCardCost] = useState(0);

    const currUserID = localStorage.getItem('currentUserId')


    const handleDateChange = (date) => {
        setSelectedDate(date);
        console.log(date)
    };

    const toCreateShopCard = (e) => {

        e.preventDefault();
        const data = {
            img: "https://img.freepik.com/free-vector/pet-shop-composition_1284-25876.jpg?w=826&t=st=1682953595~exp=1682954195~hmac=2f5d7f0d78153cef622c29fee0a476f990ffefdc7865659c490f24f67e3a85d7",
            name: cardTitle,
            description: cardDescription,
            validityDate: new Date(selectedDate).toISOString(),
            cost: cardCost,
            isUsed: false
        }

        console.log('shop',data)

        axios.post('http://localhost:3000/shop', data).then(res => dispatch(changeShopCardDialogAction()));

    }

    return (
        <div className="createpost">
            <div className="createpost-container">
                <div className="close-button">
                    <img src={closeImg} alt="close button" onClick={() => dispatch(changeShopCardDialogAction())} />
                </div>
                <h2>Создайте карточку</h2>

                <div className="post-inputs">
                    <label htmlFor="">Введите название</label>
                    <input onChange={(e) => setCardTitle(e.target.value)}/>

                    <label htmlFor="">Введите описание карточки</label>
                    <textarea onChange={(e) => setCardDescription(e.target.value)}/>

                    <label htmlFor="">Введите дату истечения срока</label>

                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru">
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker value={selectedDate} onChange={handleDateChange} label="Basic date picker"  views={['year', 'month', 'day']}/>
                        </DemoContainer>
                    </LocalizationProvider>

                    <label htmlFor="">Введите стоимость</label>
                    <input onChange={(e) => setCardCost(+e.target.value)}/>


                    {/*<label htmlFor="">Изображение</label>*/}
                    <div className="img-uploader">
                        Загрузить картинку
                        <input type='file' accept="image/*" multiple="false"/>
                    </div>

                    <button onClick={(e) => toCreateShopCard(e)}>Создать карточку</button>
                </div>
            </div>
        </div>
    )
}
