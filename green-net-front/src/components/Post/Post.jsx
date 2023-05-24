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

export const Post = (props) => {
    const dispatch = useDispatch();

    const authUser = useSelector(state => state.user.user);
    const authUserId = localStorage.getItem('currentUserId');
    const currentUserId = localStorage.getItem('currentUserId');
    const post = props.post;

    const [isPostLiked, setIsPostLiked] = useState(false);
    const [likesAmount, setLikesAmount] = useState(0);

    useEffect(() => {
        getLikesAmount(post.id);
        setIsPostLiked(authUser?.likedPosts?.includes(post.id));
        console.log("post likes", post.likesAmount, likesAmount);
        // console.log("users liked posts", authUser);
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

    const unLikePost = async (postId) => {
        await axios.post(`http://localhost:3000/posts/${postId}/unlike`, { currentUserId: authUserId })
            .then(() => {
                setIsPostLiked(false);
                getLikesAmount(post.id);
            });
    };

    return (
        <div className="post-container">
            {post.id}
            <div className="delete-button">
                <img src={closeImg} alt="delete button" onClick={() => dispatch(deletePost(post.id)).then(res => dispatch(getUsersPosts(currentUserId)))} />
            </div>
            <div className="content">
                <p className="text">{post?.text}</p>
            </div>
            <hr />
            <div className="actions">
                <div className="like">
                    <span>{likesAmount}</span>
                    <img src={isPostLiked ? likeImg : unLikeImg} alt="like" onClick={() => isPostLiked ? unLikePost(post.id) : likePost(post.id)} />
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
    )
}

Post.propTypes = {
    post: PropTypes.object,
}