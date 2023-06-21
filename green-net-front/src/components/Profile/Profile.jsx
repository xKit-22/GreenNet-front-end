import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'

import './profile.scss'
import av from '../../assets/cat.jpg'
import logoutImg from '../../assets/logout.svg'
import coin from '../../assets/coin.png'
import { getUsersPosts, deletePost } from '../../redux/postSlice';
import { changeEventDialogAction, changePostDialogAction } from '../../redux/dialogsSlice'
import { isMyProfileAction, getUserById } from '../../redux/userSlice'
import { Post } from '../Post/Post'
import {notificationService} from "../../config/notificationConfig";

export const Profile = () => {
    const dispatch = useDispatch();
    const currentUserId = window.location.pathname.slice(1);
    const authUserId = localStorage.getItem('currentUserId');
    const [user, setUser] = useState({});
    const [postsAmount, setPostsAmount] = useState(0);
    const usersPosts = useSelector(state => state.post.usersPosts);
    const isMyProfile = useSelector(state => state.user.isMyProfile);

    const [subscribeBtn, setSubscribeBtn] = useState('Вы подписаны')
    const [subscribersAmount, setSubscribersAmount] = useState(1)

    console.log("id: ", currentUserId);

    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setUser(res.data);
            setPostsAmount(res.data.postsAmount);
        });
    }

    useEffect(() => {
        dispatch(getUserById(authUserId));
        dispatch(isMyProfileAction());
        getUser(currentUserId);
    }, [])


    useEffect(() => {
        dispatch(getUsersPosts(currentUserId));
    }, [user])

    const sortedPosts = () => {
        const sorted = JSON.parse(JSON.stringify(usersPosts));
        sorted.sort((a, b) => b.dateOfCreation - a.dateOfCreation);

        console.log('sorted post', sorted);
        return sorted;
    }

    const toSubscribe = () => {
        if (subscribeBtn === 'Вы подписаны') {
            setSubscribeBtn('Подписаться')
            notificationService.success(`Вы отписались от пользователя ${user.nickname}`);
        } else {
            setSubscribeBtn('Вы подписаны')
            notificationService.success(`Вы подписались на пользователя ${user.nickname}`);
        }
    }

    const logout = () => {
        localStorage.setItem('token', '');
        window.location.pathname = '/login';
    }

    const avatar = 'https://img.freepik.com/premium-photo/a-stylized-lion-sits-in-a-clearing-among-flowers-children-s-drawing-on-paper-painted-in-watercolor-on-a-light-background-generative-ai_384720-263.jpg?w=740'
    const avatar2 = 'https://img.freepik.com/free-photo/adorable-dog-with-abstract-colorful-graphic-background_23-2150022290.jpg?w=740&t=st=1684323611~exp=1684324211~hmac=f52f6a6f5a2cd828a31f8c42e73a689ca1a1dd43fa3395a5f3cc7e9ae249fec6'

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="user-info">
                    <div className="avatar-container">
                        <span>
                            <img src={avatar2} alt="avatar" />
                        </span>
                    </div>
                    <div className="info">
                        <div className="title">
                            <p className="user-name">{user?.nickname}</p>
                            <div className="title-right">
                                {
                                    isMyProfile ?
                                        <div className="coin">
                                            <span>{user?.coinsAmount}</span><img width="30px" src={coin} alt="монетка" />
                                        </div>
                                        :
                                        ''
                                }
                                {
                                    isMyProfile ?
                                        <Link to="/edit-profile" className="">
                                            <button>Редактировать</button>
                                        </Link>
                                        :
                                        ''
                                }
                                {
                                    isMyProfile ?
                                        <button onClick={() => logout()}><img src={logoutImg} alt="выйти" /></button>
                                        :
                                        <button onClick={toSubscribe}>{subscribeBtn}</button>
                                }
                            </div>
                        </div>
                        <div className='about'>
                            {/*<p><b>О себе</b></p>*/}
                            <p>{user?.description}</p>
                        </div>
                        {
                            (!user?.activation) ? <p>Подтвердите Электорнную почту!</p> : ''
                        }
                        <div className="numbers">
                            <div className="number-group">
                                <p className="amount">{user?.postsAmount}</p>
                                <p className="amount-label">постов</p>
                            </div>
                            <div className="number-group">
                                <p className="amount">{subscribersAmount}</p>
                                <p className="amount-label">подписчиков</p>
                            </div>
                            <div className="number-group">
                                <p className="amount">{user?.subscriptionsAmount}</p>
                                {/*<p className="amount">1</p>*/}
                                <p className="amount-label">подписок</p>
                            </div>
                            {/*<div className="number-group">*/}
                            {/*    <p className="amount">{user?.allLikesAmount}</p>*/}
                            {/*    <p className="amount-label">лайков</p>*/}
                            {/*</div>*/}
                        </div>

                    </div>
                </div>
                {
                    isMyProfile ?
                        <div className="buttons-blocks">
                            <button onClick={() => dispatch(changeEventDialogAction())}>Создать событие</button>
                            <button onClick={() => dispatch(changePostDialogAction())}>Создать пост</button>
                        </div>
                        :
                        ''
                }

                <hr />
                {/*<h2>Лента постов</h2>*/}
                <div className="allPosts">
                    {
                        sortedPosts().map(item => (
                            <Post isMyProfile={isMyProfile} post={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}