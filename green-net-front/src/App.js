import { Routes, Route } from "react-router-dom";

import './App.css';
import { Header } from './components/Header/Header';
import { Profile } from "./components/Profile/Profile";
import { Login } from "./components/Login/Login";
import { Registration } from "./components/Registration/Registration";

function App() {
  return (
    <div className="App">
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
