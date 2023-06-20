//Изменение некоторых стилей для табов
import { makeStyles } from "@material-ui/core/styles";
import Box from "@mui/material/Box";
import { changeShopCardDialogAction } from "../../redux/dialogsSlice";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import coin from "../../assets/coin.png";
import { ShopCardList } from "../Shop/ShopCardList";
import { InventoryCardList } from "../Shop/InventoryCardList";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getUserById, isMyProfileAction } from "../../redux/userSlice";
import { getUsersPosts } from "../../redux/postSlice";
import { Post } from "../Post/Post";
import './adminPanel.scss'
import list from '../../assets/list.png'
import { PostCard } from "./PostCard";
import { UserListItem } from "./UserListItem";
import { AddMarkerType } from "./AddMarkerType";
import { UserLine } from "../UserSearch/UserLine";

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


    const [value, setValue] = useState('moder');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const dispatch = useDispatch();
    const currentUserId = window.location.pathname.slice(1);
    const authUserId = localStorage.getItem('currentUserId');
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [allPosts, setAllPosts] = useState([])
    const [postsAmount, setPostsAmount] = useState(0);
    const usersPosts = useSelector(state => state.post.usersPosts);
    const isMyProfile = useSelector(state => state.user.isMyProfile);


    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setUser(res.data);
            setPostsAmount(res.data.postsAmount);
        });
    }

    const getUsers = async () => {
        await axios.get(`http://localhost:3000/users`).then(res => {
            setUsers(res.data);
        });
    }

    const getPosts = async (id) => {
        await axios.get(`http://localhost:3000/posts`).then(res => {
            setAllPosts(res.data);
        });
    }

    useEffect(() => {
        dispatch(getUserById(authUserId));
        dispatch(isMyProfileAction());
        getUser(authUserId);
        getUsers();
        getPosts()
    }, [])


    useEffect(() => {
        dispatch(getUsersPosts(authUserId));
    }, [user])

    const sortedPosts = () => {
        const sorted = JSON.parse(JSON.stringify(allPosts));
        sorted.sort((a, b) => a.dateOfCreation - b.dateOfCreation);
        console.log('allPosts', allPosts)
        console.log('sorted post', sorted);
        return sorted;
    }

    return (
        <Box sx={{ width: '90%' }} className={`${classes.root} box-container`}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab tabs">
                        <Tab label="На модерации" value="moder" />
                        <Tab label="Одобрено" value="approve" />
                        <Tab label="Отклонено" value="reject" />
                        <Tab label="Пользователи" value="users" />
                        <Tab label="Создать тип" value="markerTypes" />
                    </TabList>
                </Box>
                <TabPanel value="moder">
                    <div className='allPosts-container'>
                        <div className="allPosts">
                            {
                                sortedPosts().filter(item => {
                                    return item.status === 'onModer'
                                }).map(item => {
                                    return <PostCard post={item} />
                                })
                            }
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="approve">
                    <div className="allPosts">
                        {
                            sortedPosts().filter(item => {
                                return item.status === 'approve'
                            }).map(item => {
                                return <PostCard post={item} />
                            })
                        }
                    </div>
                </TabPanel>
                <TabPanel value="reject">
                    {
                        sortedPosts().filter(item => {
                            return item.status === 'reject'
                        }).map(item => {
                            return <PostCard post={item} />
                        })
                    }
                </TabPanel>
                <TabPanel value="users">
                    <div>
                        {
                            users && users.map((user, index) => {
                                return (
                                    <UserLine user={user} />
                                )
                            })
                        }
                    </div>
                </TabPanel>
                <TabPanel value="markerTypes">
                    <AddMarkerType />
                </TabPanel>
            </TabContext>
        </Box>
    )
}