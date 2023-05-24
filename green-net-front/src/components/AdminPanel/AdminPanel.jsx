

//Изменение некоторых стилей для табов
import {makeStyles} from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import {changeShopCardDialogAction} from "../../redux/dialogsSlice";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import coin from "../../assets/coin.png";
import {ShopCardList} from "../Shop/ShopCardList";
import {InventoryCardList} from "../Shop/InventoryCardList";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {getUserById, isMyProfileAction} from "../../redux/userSlice";
import {getUsersPosts} from "../../redux/postSlice";
import {Post} from "../Post/Post";
import './adminPanel.scss'
import list from '../../assets/list.png'

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

export const AdminPanel = () => {
    const classes = useStyles();


    const [value, setValue] = useState('posts');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();
    const currentUserId = window.location.pathname.slice(1);
    const authUserId = localStorage.getItem('currentUserId');
    const [user, setUser] = useState({});
    const [postsAmount, setPostsAmount] = useState(0);
    const usersPosts = useSelector(state => state.post.usersPosts);
    const isMyProfile = useSelector(state => state.user.isMyProfile);


    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setUser(res.data);
            setPostsAmount(res.data.postsAmount);
        });
    }

    useEffect(() => {
        dispatch(getUserById(authUserId));
        dispatch(isMyProfileAction());
        getUser(authUserId);
    }, [])


    useEffect(() => {
        dispatch(getUsersPosts(authUserId));
    }, [user])

    const sortedPosts = () => {
        const sorted = JSON.parse(JSON.stringify(usersPosts));
        sorted.sort((a, b) => b.dateOfCreation - a.dateOfCreation);

        console.log('sorted post', sorted);
        return sorted;
    }

    return (
        <Box sx={{width: '90%'}} className={`${classes.root} box-container`}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} aria-label="lab tabs">
                        <Tab label="Посты" value="posts"/>
                        <Tab label="Пользователи" value="users"/>
                    </TabList>
                </Box>
                <TabPanel value="posts">
                    <div className='allPosts-container'>
                        <div className="allPosts">
                            <button className='approve'>Одобрить</button>
                            <button className='reject'>Отклонить</button>
                            {
                                sortedPosts().map(item => (
                                    <Post post={item}/>
                                ))
                            }
                            {
                                sortedPosts().map(item => (
                                    <Post post={item}/>
                                ))
                            }
                        </div>

                    </div>
                </TabPanel>
                <TabPanel value="users">
                    <img src={list}/>
                </TabPanel>
            </TabContext>
        </Box>
    )
}