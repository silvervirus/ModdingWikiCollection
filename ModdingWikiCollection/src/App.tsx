// src/App.tsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import ModderDashboard from './pages/ModderDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ModPage from './pages/ModPage'
import ModEditPage from './pages/ModEditPage'
import Support from './pages/Support'
import SupportPage from './pages/SupportPage'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './pages/NotFound'
import ModManager from './pages/ModManager'

import bg from './assets/background.jpg'

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#eee',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Navbar />

      <div style={{ padding: '1rem' }}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/support" element={<Support />} />
          <Route path="/support/:id" element={<SupportPage />} />
          <Route path="/profile/:username" element={<Profile />} />

          {/* Mod routes */}
          <Route path="/mod/:id/edit" element={<ModEditPage />} />
          <Route path="/mod/:id" element={<ModPage />} />
           <Route path="/mod-manager" element={<ModManager />} />

          {/* Modder-only */}
          <Route
            path="/modder"
            element={
              <ProtectedRoute role="modder">
                <ModderDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin-only */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  )
}

