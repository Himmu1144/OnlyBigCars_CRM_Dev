import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
// import SettingsPage from './pages/SettingsPage';
// import LoginPage from './pages/LoginPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/settings" element={<SettingsPage />} />
                <Route path="/login" element={<LoginPage />} /> */}
            </Routes>
        </Router>
    );
};

export default App;
