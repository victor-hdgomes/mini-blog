import '../App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from '../pages/Home';
import About from '../pages/About';

import Error from '../pages/Error'

import Header from '../components/Header'
import Footer from '../components/Footer'

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Header />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />

                    {/*not found*/}
                    <Route path="*" element={<Error />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    )
}

export default RoutesApp;