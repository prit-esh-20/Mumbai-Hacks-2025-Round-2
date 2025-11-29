import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const { user } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="container nav-container">
                    <div className="logo">
                        <i className="fas fa-heartbeat"></i> MediNest
                    </div>
                    <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                        <li>
                            <a href="#home" className="nav-link">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="#features" className="nav-link">
                                Features
                            </a>
                        </li>
                        <li>
                            <Link to="/pricing" className="nav-link">
                                Pricing
                            </Link>
                        </li>
                        {!user ? (
                            <>
                                <li>
                                    <Link to="/login" className="nav-link auth-link">
                                        Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="btn btn-primary auth-link">
                                        Get Started
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/dashboard" className="nav-link profile-link">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                    <div className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
