import './post-card.scss'
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

let moment = require('moment');

export const PostCard = ({ post }) => {

    const [author, setAuthor] = useState()

    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setAuthor(res.data);
        });
    }

    const updatePostStatus = async (status, id) => {
        await axios.put(`http://localhost:3000/posts/${id}`, {
            status: status
        });
        window.location.reload();
    }

    useEffect(() => {
        getUser(post.authorId)
    }, [])

    const postImg2 = 'https://img.freepik.com/free-photo/overhead-view-of-plastic-trash-on-sand-at-beach_23-2148214516.jpg?w=900&t=st=1684333809~exp=1684334409~hmac=96675b7c0792881e4c6f7abeef183eb215ce400993044ca944e122382833b3f6'

    return (
        <div className='post-card-container'>
            <p>{
                author && author.nickname
            }</p>
            <p>
                {moment(new Date(+post.dateOfCreation).toISOString()).format('DD.MM.YYYY, hh:mm')}
            </p>
            <p><img alt={'картинка'} src={postImg2} /></p>
            <p className='post-text'>{post.text}</p>
            <Status status={post.status} />
            {
                post.status === 'onModer' &&
                <div className='btn-container'>
                    <button onClick={() => updatePostStatus('approve', post.id)} className='approve-btn first-btn'>Одобрить</button>
                    <button onClick={() => updatePostStatus('reject', post.id)} className='reject-btn'>Отклонить</button>
                </div>

            }
            {
                post.status === 'approve' &&
                <div className='btn-container'>
                    <button onClick={() => { updatePostStatus('onModer', post.id) }} className='moder-btn first-btn'>На модерацию</button>
                    <button onClick={() => updatePostStatus('reject', post.id)} className='reject-btn'>Отклонить</button>
                </div>
            }
            {
                post.status === 'reject' &&
                <div className='btn-container'>
                    <button onClick={() => updatePostStatus('onModer', post.id)} className='moder-btn first-btn'>На модерацию</button>
                    <button onClick={() => updatePostStatus('approve', post.id)} className='approve-btn'>Одобрить</button>
                </div>
            }

        </div>
    )
}

const Status = (props) => {
    const status = props.status;
    let text, color;
    switch (status) {
        case 'onModer':
            text = 'На модерации';
            color = '#e6ac00'
            break;

        case 'approve':
            text = 'Одобрено';
            color = '#29a329'
            break;

        case 'reject':
            text = 'Отклонено';
            color = '#e60000'
            break;

        default:
            break;
    }
    return <p style={{ color: color, fontWeight: "bold", fontSize: "24px" }}>{text}</p>
}

Status.propTypes = {
    status: PropTypes.string,
}