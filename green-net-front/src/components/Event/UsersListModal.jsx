import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useEffect, useState} from "react";
import axios from "axios";
import UserListItem from "./UsersListItem";

export default function UsersListModal(props) {
    const [userList, setUserList] = useState([])


    useEffect(() => {
        const fetchUserData = async () => {
            const fetchedUsers = await Promise.all(
                props.event.membersArr.map(async (user) => {
                    const userObj = JSON.parse(user)
                    const response = await axios.get(`http://localhost:3000/users/${userObj.id}`);
                    return response.data;
                })
            );

            setUserList(fetchedUsers);
        };

        fetchUserData();
    }, []);

    //console.log('event', props.event)
    console.log('userArr', userList)
    return (
            <Dialog
                open={props.open}
                onClose={props.handleClickShowUserList}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Отметьте присутствующих"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {
                            userList.map((user, index) => {
                                return (
                                    <UserListItem key={index} user={user} event={props.event}/>
                                )
                            })
                        }
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <button className='ok-btn' onClick={props.handleClickShowUserList} autoFocus>
                        ОК
                    </button>
                </DialogActions>
            </Dialog>
    );
}