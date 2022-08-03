import '../App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CreatePost from '../pages/CreatePost';
import Dashboard from '../pages/Dashboard';
import Search from '../pages/Search';
import Post from '../pages/Post';

import Error from '../pages/Error'

import Header from '../components/Header'
import Footer from '../components/Footer'

// Authentication
import { useAuthValue } from '../contexts/AuthContext'

const RoutesApp = () => {
    const { user } = useAuthValue()
    
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/posts/:id" element={<Post />} />
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                    <Route path="/posts/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />

                    {/*not found*/}
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}

export default RoutesApp;