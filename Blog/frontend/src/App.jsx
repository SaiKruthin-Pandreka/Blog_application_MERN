import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import Profile from './pages/Profile.jsx';
import Nav from './pages/Nav.jsx';
import NavUser from './pages/NavUser.jsx'
import Blogs from './pages/Blogs.jsx'
import HomeUser from './pages/HomeUser.jsx';
import axios from "axios"
import CreateBlog from './pages/CreateBlog.jsx';
import ViewBlog from './pages/ViewBlog.jsx';
import { useEffect } from 'react';
import UserBlogs from './pages/UserBlogs.jsx';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:4000'; // Your backend URL

function App() {

  useEffect(() => {
    let token = sessionStorage.getItem('token')
    if (token) {
    axios.defaults.headers.common['authorization'] = `Bearer ${sessionStorage.getItem('token')}`
    }
  })
  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Nav" element={<Nav />} />
          <Route path="/NavUser" element={<NavUser />} />
          <Route path="/Blogs" element={<Blogs/>}/>
          <Route path="/Home-user" element={<HomeUser/>}/>
          <Route path="/create-blog" element={<CreateBlog/>}/>
          <Route path="/one-blog/:id" element={<ViewBlog />} />
          <Route path="/user-blogs" element={<UserBlogs />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
