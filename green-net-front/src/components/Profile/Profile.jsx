import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import './profile.scss'
import av from '../../assets/cat.jpg'
import { getUserById } from '../../redux/userSlice'
import { getUsersPosts } from '../../redux/postSlice';
import likeImg from '../../assets/like.svg'
import unLikeImg from '../../assets/unlike.svg'


export const Profile = () => {
    const dispatch = useDispatch();
    const currentUserId = window.location.pathname.slice(1);
    const user = useSelector(state => state.user.user);
    const usersPosts = useSelector(state => state.post.usersPosts);

    console.log("id: ", currentUserId)

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        dispatch(getUserById(currentUserId));
        dispatch(getUsersPosts(currentUserId));
    }, [])

    // useEffect(() => {
    //     console.log("user", user);
    //     console.log("posts", usersPosts);
    // }, [user, usersPosts])

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
                            <button>Подписаться</button>
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
                    <button>Создать пост</button>
                </div>
                <hr />
                <div className="allPosts">
                    {usersPosts.map(item => (
                         <div className="post-container">
                        <div className="content">
                            <p className="text">{item?.text}</p>
                        </div>
                        <hr />
                        <div className="actions">
                            <div className="like">
                                <span>{item?.likesAmount}</span>
                                <img src={isLiked ? likeImg : unLikeImg} alt="like" onClick={() => setIsLiked(!isLiked)} />
                            </div>
                            <div className="comment">
                                <h3>Комментарии</h3>
                                <div className="create-container">
                                    <textarea name="" id="" cols="" rows="10"></textarea>
                                    <button>Отправить</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}