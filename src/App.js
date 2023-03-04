import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Playlist from "./components/Playlists";
import axios from "axios";

function App() {
  const user = localStorage.getItem("token");
  axios.defaults.baseURL = "https://movies-app-8gy2.onrender.com/";
  return (
    <Routes className="body">
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route path="/playlistuser/:id" element={<Dashboard />} />c
      <Route path="/playlists" element={<Playlist />} />
    </Routes>
  );
}

export default App;
