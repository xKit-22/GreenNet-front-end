import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import './App.css';
import { Header } from './components/Header/Header';
import { Profile } from "./components/Profile/Profile";
import { Login } from "./components/Login/Login";
import { Registration } from "./components/Registration/Registration";
import { CreatePostDialog } from "./components/Profile/CreatePostDialog";
import { UserSearch } from "./components/UserSearch/UserSearch";
import { EditProfile } from "./components/Profile/EditProfile";
import { MapPage } from "./components/Map/MapPage";
import { MapProvider } from './components/Map/Map';

function App() {
  const isCreatePostDialogOpen = useSelector(state => state.dialog.createPostDialog);
  const currentUserId = localStorage.getItem("currentUserId");
  return (
    <MapProvider>
      <div className="App">
        {isCreatePostDialogOpen ? <CreatePostDialog userId={currentUserId}/> : ""}
        <Header />
        <Routes>
          <Route path="/:nickname" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/user-search" element={<UserSearch />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
        
      </div>
    </MapProvider>

  );
}

export default App;
