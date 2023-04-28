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

    return (
        <div className="post-container">
            {/* {post.id} */}
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