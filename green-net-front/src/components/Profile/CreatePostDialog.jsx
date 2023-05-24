import { useDispatch } from 'react-redux'
import { useState } from 'react';
import PropTypes from 'prop-types';

import { changePostDialogAction } from '../../redux/dialogsSlice'
import { createPost } from '../../redux/postSlice';
import './profile.scss'
import closeImg from '../../assets/close.svg'

export const CreatePostDialog = (props) => {
    const dispatch = useDispatch();
    const [postText, setPostText] = useState('');

    const toCreatePost = (e) => {
        e.preventDefault();
        const data = {
            text: postText,
            picture: 'pictureDef',
            likesAmount: 0,
            authorId: props.userId,
            dateOfCreation: +new Date(),
        }

        dispatch(createPost(data))
            .then(res => dispatch(changePostDialogAction()));
    }

    return (
        <div className="createpost">
            <div className="createpost-container">
                <div className="close-button">
                    <img src={closeImg} alt="close button" onClick={() => dispatch(changePostDialogAction())} />
                </div>
                <h2>Создайте пост</h2>

                <div className="post-inputs">
                    <label htmlFor="">Текст публикации</label>
                    <textarea onChange={(e) => setPostText(e.target.value)}></textarea>
                    {/*<label htmlFor="">Изображение</label>*/}
                    <div className="img-uploader">
                        <button>Загрузить картинку</button>
                    </div>

                    <button onClick={(e) => toCreatePost(e)}>Создать пост</button>
                </div>
            </div>
        </div>
    )
}

CreatePostDialog.propTypes = {
    userId: PropTypes.string,
}