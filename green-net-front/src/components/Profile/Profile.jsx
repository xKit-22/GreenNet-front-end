import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import axios from 'axios'

import './profile.scss'
import av from '../../assets/cat.jpg'
import { getUsersPosts, deletePost } from '../../redux/postSlice';
import { changePostDialogAction } from '../../redux/dialogsSlice'
import { isMyProfileAction, getUserById } from '../../redux/userSlice'
import { Post } from '../Post/Post'

export const Profile = () => {
    const dispatch = useDispatch();
    const currentUserId = window.location.pathname.slice(1);
    const authUserId = localStorage.getItem('currentUserId');
    // const authUser = useSelector(state => state.user.user);
    const [user, setUser] = useState({});
    const usersPosts = useSelector(state => state.post.usersPosts);
    const isMyProfile = useSelector(state => state.user.isMyProfile);

    console.log("id: ", currentUserId);

    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => setUser(res.data));
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
        sorted.sort((a, b) => a.dateOfCreation - b.dateOfCreation);

        console.log('sorted post', sorted);
        return sorted;
    }

    return (
        <div className="profile">
            <div className="profile-container">
                <div className="user-info">
                    <div className="avatar-container">
                        <span>
                            <img src={av} alt="avatar" />
                        </span>
                    </div>
                    <div className="info">
                        <div className="title">
                            <p className="user-name">{user?.nickname}</p>
                            {
                                isMyProfile ?
                                    <button>Редактировать</button>
                                    :
                                    <button>Подписаться</button>
                            }
                        </div>

                        <div className="numbers">
                            <div className="number-group">
                                <p className="amount">{user?.postsAmount}</p>
                                <p className="amount-label">постов</p>
                            </div>
                            <div className="number-group">
                                <p className="amount">{user?.subscribersAmount}</p>
                                <p className="amount-label">подписчиков</p>
                            </div>
                            <div className="number-group">
                                <p className="amount">{user?.subscriptionsAmount}</p>
                                <p className="amount-label">подписок</p>
                            </div>
                            <div className="number-group">
                                <p className="amount">{user?.allLikesAmount}</p>
                                <p className="amount-label">лайков</p>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="buttons-blocks">
                    <button>Создать событие</button>
                    <button onClick={() => dispatch(changePostDialogAction())}>Создать пост</button>
                </div>
                <hr />
                <div className="allPosts">
                    {
                        sortedPosts().map(item => (
                            <Post post={item} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}