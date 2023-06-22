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
    const [posts, setPosts] = useState([]);
    const [postsAmount, setPostsAmount] = useState(0);
    const usersPosts = useSelector(state => state.post.usersPosts);
    const isMyProfile = useSelector(state => state.user.isMyProfile);


    const getUser = async (id) => {
        await axios.get(`http://localhost:3000/users/${id}`).then(res => {
            setUser(res.data);
            setPostsAmount(res.data.postsAmount);
        });
    }

    const getPosts = async () => {
        await axios.get(`http://localhost:3000/posts`).then(res => {
            setPosts(res.data);
        });
    }

    useEffect(() => {
        dispatch(getUserById(authUserId));
        dispatch(isMyProfileAction());
        getUser(authUserId);
        getPosts()
    }, [])


    useEffect(() => {
        dispatch(getUsersPosts(authUserId));
    }, [user])

    const sortedPosts = () => {
        const sorted = JSON.parse(JSON.stringify(posts));
        sorted.sort((a, b) => b.dateOfCreation - a.dateOfCreation);

        console.log('sorted post', sorted);
        return sorted;
    }

    return (
        <div className='allPosts-container'>
            <div className="allPosts-feed">
                {
                    authUserId === 'zH5EXUn9F' ?
                    sortedPosts().filter(item => item.authorId === '94umpCxyT' && item.status === 'approve').map(item => (
                        <Post post={item}/>
                    ))
                        :
                        sortedPosts().filter(item => item.authorId === 'zH5EXUn9F' && item.status === 'approve').map(item => (
                            <Post post={item}/>
                        ))
                }
            </div>

        </div>
    )


}

