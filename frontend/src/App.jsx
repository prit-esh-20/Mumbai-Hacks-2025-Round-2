import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Recommendations from './pages/Recommendations'
import Insurance from './pages/Insurance'
import InsuranceDetails from './pages/InsuranceDetails'
import Pricing from './pages/Pricing'

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/pricing" element={<Pricing />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/recommendations" element={<Recommendations />} />
                    <Route path="/insurance" element={<Insurance />} />
                    <Route path="/insurance-details" element={<InsuranceDetails />} />
                </Routes>
            </Router>
        </AuthProvider>
    )
}

export default App
