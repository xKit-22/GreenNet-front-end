import PropTypes from 'prop-types';
import {useEffect, useState} from 'react';
import axios from 'axios'

import './post.scss'
import ava from '../../assets/cat.jpg'
import bin from "../../assets/delete.png";
import {deletePost, getUsersPosts} from "../../redux/postSlice";

let moment = require('moment');

export const Comment = (props) => {
    const comment = props.comment;

    const [author, setAuthor] = useState('')
    const [isMyPage, setIsMyPage] = useState(true)
    const currentUserId = localStorage.getItem('currentUserId');
    const currentUrl = window.location.href;
    const curID = currentUrl.split("/")[3];

    const getAuthor = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => setAuthor(res.data));
    }


    const deleteComment = async (id) => {
        await axios.delete(`http://localhost:3000/comments/${id}`);
    }

    useEffect(() => {
        getAuthor(comment.authorId);
        if (currentUserId === curID) {
            setIsMyPage(true)
        } else {
            setIsMyPage(false)
        }
    }, [])

    const avatar = 'https://img.freepik.com/free-photo/adorable-dog-with-abstract-colorful-graphic-background_23-2150022290.jpg?w=740&t=st=1684323611~exp=1684324211~hmac=f52f6a6f5a2cd828a31f8c42e73a689ca1a1dd43fa3395a5f3cc7e9ae249fec6'

    return (
        <div className="comment">
            <div className="comment-header">
                <span>
                    <img src={avatar} alt="avatar"/>
                </span>
                <p className="nickname">{author.nickname}</p>
                <p className="comment-date">{moment(comment.dateOfCreation).format('DD.MM.YYYY, hh:mm')}</p>
                {
                    isMyPage &&
                    <div className="delete-button">
                        <img src={bin} alt="delete button"
                             onClick={() => deleteComment(comment.id).then()}/>
                    </div>
                }
            </div>
            <div className="comment-content">
                <p>{comment.text}</p>
            </div>
            <hr/>
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
}