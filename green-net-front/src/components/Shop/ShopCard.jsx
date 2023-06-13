import './shopCard.scss'
import coin from "../../assets/coin.png";
import Divider from '@mui/material/Divider';
import {Tooltip} from "@material-ui/core";
import axios from "axios";
import {useEffect, useState} from "react";
import {getUserById} from "../../redux/userSlice";
import {notificationService} from "../../config/notificationConfig";

export const ShopCard = ({item, onAdd, userCoins}) => {

    const currentUserId = localStorage.getItem('currentUserId');
    const [user, setUser] = useState({});


    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${currentUserId}`).then(res => {
            setUser(res.data);
        });
    }

    useEffect(() => {
        getUser(currentUserId)
    }, []);

    const deleteShopCard = () => {
        axios.delete(`http://localhost:3000/shop/${item.id}`)
        notificationService.success(`Карточка "${item.name}" удалена`);
        window.location.pathname = '/shop';
    }


    return (
        <div className="shop-card">
            <div className="card-img-container">
                <img height="200px"
                     src={item.img}
                     alt="картинка к товару"/>
            </div>
            <div>
                <h3>{item.name}</h3>
                <p className="card-desc">{item.description}</p>
                <Divider/>
                <div className="card-cost">
                    <p>Стоимость: <b>{item.cost}</b></p> <img width="20px" src={coin} alt="монетка"/>
                </div>
                {
                    item.cost > userCoins ?
                        <Tooltip title="Недостаточно монет для покупки">
                            <button disabled={true} className="card-btn">Получить</button>
                        </Tooltip>
                        :
                        <button onClick={() => onAdd(item)} className="card-btn">Получить</button>
                }
                {
                    user.isAdmin && <button onClick={deleteShopCard}>Удалить</button>
                }

            </div>
        </div>
    )

}

