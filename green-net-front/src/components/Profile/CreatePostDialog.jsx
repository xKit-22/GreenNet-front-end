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
            picture: 'https://img.freepik.com/free-photo/high-angle-food-in-reusable-bag-on-grass_23-2148523410.jpg?w=996&t=st=1687385880~exp=1687386480~hmac=7744c5d5d00051e1a7a4cb8f63bcb81d44b6675a229f3ac611fe5644945f3fad',
            likesAmount: 0,
            authorId: props.userId,
            dateOfCreation: +new Date(),
            status: 'onModer'
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
                        Загрузить картинку
                        <input type='file' accept="image/*" multiple="false"/>
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