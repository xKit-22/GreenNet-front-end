import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'

import './profile.scss'
import av from '../../assets/cat.jpg'
import { getUserById } from '../../redux/userSlice'
import likeImg from '../../assets/like.svg'
import unLikeImg from '../../assets/unlike.svg'


export const Profile = () => {
    const dispatch = useDispatch();
    const currentUserId = localStorage.getItem('currentUserId')
    const user = useSelector(state => state.user.user);

    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        dispatch(getUserById(currentUserId));
    }, [])

    useEffect(() => {
        console.log("user", user);
    }, [user])

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
                    <div className="post-container">
                        <div className="content">
                            <p className="text">текст поста лалалалалалалла Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi veniam sequi, libero deleniti minima excepturi rem! Soluta consequatur maxime iusto. Explicabo velit fugit similique ipsam, modi soluta labore dicta aliquid?</p>
                        </div>
                        <hr />
                        <div className="actions">
                            <div className="like">
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
                </div>
            </div>
        </div>
    )
}