import {useDispatch, useSelector} from "react-redux";
import {Post} from "../Post/Post";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUserById, isMyProfileAction} from "../../redux/userSlice";
import {getUsersPosts} from "../../redux/postSlice";
import './feed.scss'


export const Feed = () => {
    const dispatch = useDispatch();
    const currentUserId = window.location.pathname.slice(1);
    const authUserId = localStorage.getItem('currentUserId');
    const [user, setUser] = useState({});
    const [postsAmount, setPostsAmount] = useState(0);
    const usersPosts = useSelector(state => state.post.usersPosts);
    const isMyProfile = useSelector(state => state.user.isMyProfile);


    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setUser(res.data);
            setPostsAmount(res.data.postsAmount);
        });
    }

    useEffect(() => {
        dispatch(getUserById(authUserId));
        dispatch(isMyProfileAction());
        getUser(authUserId);
    }, [])


    useEffect(() => {
        dispatch(getUsersPosts(authUserId));
    }, [user])

    const sortedPosts = () => {
        const sorted = JSON.parse(JSON.stringify(usersPosts));
        sorted.sort((a, b) => b.dateOfCreation - a.dateOfCreation);

        console.log('sorted post', sorted);
        return sorted;
    }

    return (
        <div className='allPosts-container'>
            <div className="allPosts">
                {
                    sortedPosts().map(item => (
                        <Post post={item}/>
                    ))
                }
                {
                    sortedPosts().map(item => (
                        <Post post={item}/>
                    ))
                }
            </div>

        </div>
    )


}

