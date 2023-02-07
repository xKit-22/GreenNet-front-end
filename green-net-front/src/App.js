import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import './App.css';
import { Header } from './components/Header/Header';
import { Profile } from "./components/Profile/Profile";
import { Login } from "./components/Login/Login";
import { Registration } from "./components/Registration/Registration";
import { CreatePostDialog } from "./components/Profile/CreatePostDialog";

function App() {
  const isCreatePostDialogOpen = useSelector(state => state.dialog.createPostDialog);
  const currentUserId = localStorage.getItem("currentUserId");
  return (
    <div className="App">
      {isCreatePostDialogOpen ? <CreatePostDialog userId={currentUserId}/> : ""}
      <Header />
      <Routes>
        <Route path="/:nickname" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
      
    </div>
  );
}

export default App;
