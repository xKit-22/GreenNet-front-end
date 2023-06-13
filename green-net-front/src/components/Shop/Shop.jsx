import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './shop.scss'
import {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {ShopCardList} from "./ShopCardList";
import {InventoryCardList} from "./InventoryCardList";
import {notificationService} from "../../config/notificationConfig";
import coin from "../../assets/coin.png";
import axios from "axios";
import { changeShopCardDialogAction} from "../../redux/dialogsSlice";
import {useDispatch} from "react-redux";


//Изменение некоторых стилей для табов
const useStyles = makeStyles({
    root: {
        '& .MuiTab-root': {
            color: 'rgb(59, 124, 15)',
            marginLeft: 0,
            padding: 0,
            fontFamily: "'Mulish', 'sans-serif'",
            fontWeight: 'bolder',
            fontSize: '14px',
            lineHeight: '20px',
            letterSpacing: '0.02em',
            marginRight: '24px',
        },
        '& .MuiTabs-indicator': {
            backgroundColor: 'rgb(59, 124, 15)',
            height: '3px',
        },
        '& .Mui-selected': {
            color: 'rgb(59, 124, 15) !important',
        },

    }
});

export const Shop = () => {

    const classes = useStyles();

    const dispatch = useDispatch();
    const currentUserId = localStorage.getItem('currentUserId');
    const [items, setItems] = useState([])
    const [inventory, setInventory] = useState([])
    const [value, setValue] = useState('shop');
    const [user, setUser] = useState({});
    console.log(inventory)

    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setUser(res.data);
        });
    }

    const getShop = async () => {
        await axios.get(`http://localhost:3000/shop`).then(res => {
            setItems(res.data);
        });
    }

    const subtractCoin = async (id, coinsAmount) => {
        await axios.get(`http://localhost:3000/users/${id}/subtractCoins/${coinsAmount}`)
    }

    useEffect(() => {
        setInventory(JSON.parse(localStorage.getItem("inventoryArr")));
        getUser(currentUserId);
        getShop()
    }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const addToInventory = (item) => {
        localStorage.setItem('inventoryArr', JSON.stringify([...inventory, item]))
        setInventory(JSON.parse(localStorage.getItem("inventoryArr")))
        notificationService.success(`${item.name} - добавлено в раздел "Мои купоны"!`);
        subtractCoin(currentUserId, item.cost)
        user.coinsAmount = user.coinsAmount - item.cost
    }

    return (
        <Box sx={{width: '90%'}} className={`${classes.root} box-container`}>
            {
                user.isAdmin && <button className='addCard' onClick={() => dispatch(changeShopCardDialogAction())}>Добавить карточку</button>

            }
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab tabs">
                        <Tab label="Магазин" value="shop"/>
                        <Tab label="Мои купоны" value="inventory"/>
                    </TabList>
                </Box>
                <TabPanel value="shop">
                    <div className="balance">
                        <p>Мой баланс: <b>{user?.coinsAmount}</b></p> <img width="20px" src={coin} alt="монетка"/>
                    </div>
                    <ShopCardList itemsArr={items} onAdd={addToInventory} userCoins={user?.coinsAmount}/>
                </TabPanel>
                <TabPanel value="inventory">
                    {
                        inventory.length < 1 ? <p className="inventory-empty">У вас пока нет купонов.</p> :
                            <InventoryCardList itemsArr={inventory}/>
                    }
                </TabPanel>
            </TabContext>
        </Box>
    )
}