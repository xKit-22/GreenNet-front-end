import {Routes, Route} from "react-router-dom";
import {useSelector} from "react-redux";

import './App.css';
import {Header} from './components/Header/Header';
import {Profile} from "./components/Profile/Profile";
import {Login} from "./components/Login/Login";
import {Registration} from "./components/Registration/Registration";
import {CreatePostDialog} from "./components/Profile/CreatePostDialog";
import {UserSearch} from "./components/UserSearch/UserSearch";
import {EditProfile} from "./components/Profile/EditProfile";
import {Shop} from "./components/Shop/Shop"
import {EventsPage} from "./components/EventsLists/EventsPage";
import {EventPage} from "./components/Event/EventPage";
import {CreateEventDialog} from "./components/Profile/CreateEventDialog";
import {Footer} from "./components/Footer/Footer";
import {Feed} from "./components/Feed/Feed";
import {AdminPanel} from "./components/AdminPanel/AdminPanel";
import {CreateShopCardDialog} from "./components/Shop/CreateShopCardDialog";
import {MapPage} from "./components/Map/MapPage"

function App() {
    const isCreatePostDialogOpen = useSelector(state => state.dialog.createPostDialog);
    const isCreateEventDialogOpen = useSelector(state => state.dialog.createEventDialog);
    const isCreateShopCardDialogOpen = useSelector(state => state.dialog.createShopCardDialog);
    const currentUserId = localStorage.getItem("currentUserId");
    return (
        <div className="App">
            {isCreatePostDialogOpen ? <CreatePostDialog userId={currentUserId}/> : ""}
            {isCreateEventDialogOpen ? <CreateEventDialog/> : ""}
            {isCreateShopCardDialogOpen ? <CreateShopCardDialog/> : ""}
            <Header/>
            <Routes>
                <Route path="/:nickname" element={<Profile/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/registration" element={<Registration/>}/>
                <Route path="/user-search" element={<UserSearch/>}/>
                <Route path="/edit-profile" element={<EditProfile/>}/>
                <Route path="/shop" element={<Shop/>}/>
                <Route path="/feed" element={<Feed/>}/>
                <Route path="/events" element={<EventsPage/>}/>
                <Route path="/admin" element={<AdminPanel/>}/>
                <Route path="/events/:id" element={<EventPage/>}/>
                <Route path="/map" element={<MapPage/>}/>
            </Routes>
            {/*<Footer/>*/}
        </div>
    );
}

export default App;
