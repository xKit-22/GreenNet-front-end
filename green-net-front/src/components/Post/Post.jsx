import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import axios from 'axios';

import { deletePost } from '../../redux/postSlice';
import { getUsersPosts } from '../../redux/postSlice';
import './post.scss'
import likeImg from '../../assets/like.svg'
import unLikeImg from '../../assets/unlike.svg'
import closeImg from '../../assets/close.svg'
import { Comment } from './Comment';
import ava from "../../assets/cat.jpg";
import check from '../../assets/check.png'
import time from '../../assets/time.png'
import cross from '../../assets/crossed.png'
import bin from '../../assets/delete.png'
import coin from '../../assets/coin.png'

let moment = require('moment');

export const Post = (props) => {
    const dispatch = useDispatch();

    const authUser = useSelector(state => state.user.user);
    const authUserId = localStorage.getItem('currentUserId');
    const currentUserId = localStorage.getItem('currentUserId');
    const post = props.post;

    const [commentText, setCommentText] = useState('');
    const [isPostLiked, setIsPostLiked] = useState(false);
    const [likesAmount, setLikesAmount] = useState(0);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getLikesAmount(post.id);
        getPostsComments(post.id);
        setIsPostLiked(authUser?.likedPosts?.includes(post.id));
    }, [authUser]);

    const getLikesAmount = async (postId) => {
        await axios.get(`http://localhost:3000/posts/${postId}`).then(res => setLikesAmount(res.data.likesAmount));
    };

    const likePost = async (postId) => {
        await axios.post(`http://localhost:3000/posts/${postId}/like`, { currentUserId: authUserId })
            .then(() => {
                setIsPostLiked(true);
                getLikesAmount(post.id);
            });
    };

    const getPostsComments = async (postId) => {
        await axios.get(`http://localhost:3000/comments/post/${postId}`)
            .then(data => {
                setComments(data.data);
                console.log('posts', data, comments);
            })
    }

    const unLikePost = async (postId) => {
        await axios.post(`http://localhost:3000/posts/${postId}/unlike`, { currentUserId: authUserId })
            .then(() => {
                setIsPostLiked(false);
                getLikesAmount(post.id);
            });
    };

    const createComment = async (e) => {
        e.preventDefault();

        const data = {
            postId: post.id,
            text: commentText,
            likesAmount: 0,
            authorId: authUserId,
            dateOfCreation: new Date()
        }
        await axios.post(`http://localhost:3000/comments/`, data)
            .then(data => {
                console.log('comment created ', data.data);
                setCommentText('');
                getPostsComments(post.data);
            })
    }

    const avatar = 'https://img.freepik.com/premium-photo/a-stylized-lion-sits-in-a-clearing-among-flowers-children-s-drawing-on-paper-painted-in-watercolor-on-a-light-background-generative-ai_384720-263.jpg?w=740'
    const avatar2 = 'https://img.freepik.com/free-photo/adorable-dog-with-abstract-colorful-graphic-background_23-2150022290.jpg?w=740&t=st=1684323611~exp=1684324211~hmac=f52f6a6f5a2cd828a31f8c42e73a689ca1a1dd43fa3395a5f3cc7e9ae249fec6'
    const postImg2 = 'https://img.freepik.com/free-photo/overhead-view-of-plastic-trash-on-sand-at-beach_23-2148214516.jpg?w=900&t=st=1684333809~exp=1684334409~hmac=96675b7c0792881e4c6f7abeef183eb215ce400993044ca944e122382833b3f6'
    const postImg ='https://img.freepik.com/free-photo/man-at-plastic-garbage-collecting-in-a-polluted-park_1268-20121.jpg?w=996&t=st=1684267590~exp=1684268190~hmac=c587be2607e5cc4a10ecf4cc2fb12ca81593697a8198e7c830f3044e13b4f960'

    return (
        <div className="post-container">
            {/* {post.id} */}
            <div className="post-header">
                <div className='post-header-user-info'>
                <span>
                    <img src={avatar2} alt="avatar" />
                </span>
                    <p className="nickname">xKit</p>
                    <p className="comment-date">11.05.2023, 14:58</p>
                </div>
                <div className="post-header-user-right">
                    <div className="post-header-moder">
                        <p>На модерации</p>
                        <img src={time} alt='модерация'/>
                    </div>
                    {/*<div className='reward'>*/}
                    {/*    <span>+10</span>*/}
                    {/*    <img src={coin} alt='монета'/>*/}
                    {/*</div>*/}
                    {/*<div className="delete-button">*/}
                    {/*    <img src={bin} alt="delete button" onClick={() => dispatch(deletePost(post.id)).then(res => dispatch(getUsersPosts(currentUserId)))} />*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className="content">
                <div className="content-img">
                    <img width="70%" src={postImg2} alt='картинка поста'/>
                </div>
                <p className="text">{post?.text}</p>
            </div>
            <hr />
            <div className="actions">
                <div className="like">
                    <span>{likesAmount}</span>
                    <img src={isPostLiked ? likeImg : unLikeImg} alt="like" onClick={() => isPostLiked ? unLikePost(post.id) : likePost(post.id)} />
                </div>
                <h3>Комментарии</h3>
                <div className="comments-container">
                    {
                        comments?.map(comment => <Comment comment={comment}/>)
                    }
                </div>
                <div className="comment-create">
                    <div className="create-container">
                        <textarea name="" id="" cols="" onChange={(e) => setCommentText(e.target.value)} rows="10"></textarea>
                        <button onClick={(e) => createComment(e)}>Отправить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object,
}