import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios'

import './post.scss'
import ava from '../../assets/cat.jpg'

export const Comment = (props) => {
    const comment = props.comment;

    const [author, setAuthor] = useState('')

    const getAuthor = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => setAuthor(res.data));
    }

    useEffect(() => {
        getAuthor(comment.authorId);
    }, [])
    return (
        <div className="comment">
            <div className="comment-header">
                <span>
                    <img src={ava} alt="avatar" />
                </span>
                <p className="nickname">{author.nickname}</p>
            </div>
            <div className="comment-content">
                <p>{comment.text}</p>
            </div>
            <hr />
        </div>
    )
}

Comment.propTypes = {
    comment: PropTypes.object,
}