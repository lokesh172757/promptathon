import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import VerifyNews from './pages/VerifyNews';
import RealtimeMap from './pages/RealtimeMap';
import MediaDetection from './pages/MediaDetection';
import Login from './pages/Login';
import Signup from './pages/Signup';
import LandingPage from './pages/LandingPage';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    <Route path="/dashboard" element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route path="verify" element={<VerifyNews />} />
                            <Route path="map" element={<RealtimeMap />} />
                            <Route path="media" element={<MediaDetection />} />
                        </Route>
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
