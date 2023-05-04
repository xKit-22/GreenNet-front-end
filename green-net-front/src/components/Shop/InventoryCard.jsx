import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './shopCard.scss'
import Divider from '@mui/material/Divider';
import {notificationService} from "../../config/notificationConfig";
import {Button} from "@material-ui/core";
import {useState} from "react";


let moment = require('moment');


export const InventoryCard = ({item}) => {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                <p>Действителен до: <b> {moment(item.validityDate).format('DD.MM.YYYY')}</b></p>
                {
                    moment(`${new Date()}`).format('YYYY.MM.DD') < moment(item.validityDate).format('YYYY.MM.DD')?
                        <p className="p-green">Купон действителен</p> :
                        ''
                }
                {
                    moment(`${new Date()}`).format('YYYY.MM.DD') === moment(`${item.validityDate}`).format('YYYY.MM.DD') ?
                        <p className="p-yell">Срок действия истекает сегодня</p> :
                        ''
                }
                {
                    moment(`${new Date()}`).format('YYYY.MM.DD') > moment(`${item.validityDate}`).format('YYYY.MM.DD') ?
                        <p className="p-red">Срок действия купона истек</p> :
                        ''
                }
                {
                    moment(`${new Date()}`).format('YYYY.MM.DD') <=  moment(`${item.validityDate}`).format('YYYY.MM.DD') ?
                        <button className="card-btn" onClick={handleClickOpen}>Использовать</button> :
                        <button disabled={true} className="card-btn" data-tooltip="Всплывающая подсказка сообщает о чём-то многозначном и полезном...">Использовать</button>
                }

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Использовать купон?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Вы хотите использовать купон прямо сейчас?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Да</Button>
                        <Button onClick={handleClose} autoFocus>
                            Нет
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        </div>
    )

}

