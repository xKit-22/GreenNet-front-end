import './shopCard.scss'
import coin from "../../assets/coin.png";
import Divider from '@mui/material/Divider';
import {Tooltip} from "@material-ui/core";

export const ShopCard = ({item, onAdd, userCoins}) => {
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

            </div>
        </div>
    )

}

