import {useEffect, useState} from "react";
import axios from "axios";


export default function UserListItem({user, event}) {
    const avatar = 'https://img.freepik.com/premium-photo/a-stylized-lion-sits-in-a-clearing-among-flowers-children-s-drawing-on-paper-painted-in-watercolor-on-a-light-background-generative-ai_384720-263.jpg?w=740'
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = async () => {
        try {
            await axios.post('http://localhost:3000/events/mark', {
                id: event.id,
                userId: user.id
            });
        } catch (error) {
            console.error(error);
        }
        setIsChecked(!isChecked);
    };

    useEffect(() => {
        const userMark = event.membersArr.filter(elem => {
            const tmpUser = JSON.parse(elem)
            return tmpUser.id === user.id
        })
        setIsChecked(JSON.parse(userMark).isMarked)
        console.log('isChecked',isChecked)
    }, [])

    return (
        <div className='modal-user-item'>
            <div className='modal-user-item-left'>
                <img className='modal-user-avatar' src={avatar} alt={'аватар'}/>
                <p>{user.nickname}</p>
            </div>
            <input type='checkbox' checked={isChecked} onChange={handleCheckboxChange}/>
        </div>
    )
}