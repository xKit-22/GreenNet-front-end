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
import {changeEventDialogAction, changeShopCardDialogAction} from "../../redux/dialogsSlice";
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

    const fakeShopElemArray = [
        {
            id: 1,
            img: 'https://img.freepik.com/free-vector/hand-drawn-apple-fruit-illustration_53876-2980.jpg?w=740&t=st=1682794553~exp=1682795153~hmac=b2973d1214bbd63a795869766968dc27baf6641ae04808d3c561ae9f9a75bc3f',
            name: 'item_1',
            description: 'description_1/ description_1/ description_1/ description_1/ description_1/ description_1/ description_1/ description_1/ ',
            cost: 1000,
            validityDate: `${new Date('10.10.2023').toISOString()}`,
            isUsed: false
        },
        {
            id: 2,
            img: 'https://img.freepik.com/free-vector/capybara-in-nature-pond-on-half-earth_1308-126854.jpg?w=740&t=st=1682868036~exp=1682868636~hmac=d1580da0e20e73ecf0e5b24f8e662bb26ac35726a4b99098aebc81d07b7a94d0',
            name: 'item_2',
            description: 'description_3/description_3/description_3/description_3/description_3/description_3/description_3/description_3/',
            cost: 1400,
            validityDate: `${new Date(new Date() - 24 * 3600 * 1000).toISOString()}`,
            isUsed: false
        },
        {
            id: 3,
            img: 'https://img.freepik.com/premium-vector/cute-welsh-corgi-dog-waving-paw-cartoon_42750-623.jpg?w=740',
            name: 'item_3',
            description: 'description_2/ description_2/ description_2/ description_2/description_2/description_2/description_2/description_2/',
            cost: 500,
            validityDate: `${new Date().toISOString()}`,
            isUsed: false
        },
        {
            id: 4,
            img: 'https://img.freepik.com/free-vector/pet-shop-composition_1284-25876.jpg?w=826&t=st=1682953595~exp=1682954195~hmac=2f5d7f0d78153cef622c29fee0a476f990ffefdc7865659c490f24f67e3a85d7',
            name: 'item_4',
            description: 'description_4/ description_4/ description_4/ description_4/description_4/description_4/description_4/description_4/',
            cost: 200,
            validityDate: `${new Date('10.08.2023').toISOString()}`,
            isUsed: true
        },
    ]

    const dispatch = useDispatch();

    const currentUserId = localStorage.getItem('currentUserId');
    const [items, setItems] = useState(fakeShopElemArray)
    const [inventory, setInventory] = useState([])
    const [value, setValue] = useState('shop');
    const [user, setUser] = useState({});
    console.log(inventory)

    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setUser(res.data);
        });
    }

    const subtractCoin = async (id, coinsAmount) => {
        await axios.get(`http://localhost:3000/users/${id}/subtractCoins/${coinsAmount}`)
    }

    useEffect(() => {
        setInventory(JSON.parse(localStorage.getItem("inventoryArr")));
        getUser(currentUserId);
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
            <button className='addCard' onClick={() => dispatch(changeShopCardDialogAction())}>Добавить карточку</button>
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