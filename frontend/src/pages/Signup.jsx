import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { showToast } from '../utils/helpers'

function Signup() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { signup } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const result = signup(name, email, password)
            if (result.success) {
                showToast('Account created successfully!', 'success')
                setTimeout(() => {
                    navigate('/dashboard')
                }, 1000)
            } else {
                showToast(result.message, 'error')
            }
        } catch (err) {
            console.error(err)
            showToast('Network error. Try again.', 'error')
        }
    }

    return (
        <div className="auth-container">
            <div className="glass-card auth-card fade-in">
                <Link to="/" className="auth-logo">
                    <i className="fas fa-heartbeat"></i> MediNest
                </Link>
                <h2 style={{ marginBottom: '20px' }}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">
                        Sign Up
                    </button>
                </form>
                <p style={{ marginTop: '20px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    Already have an account?{' '}
                    <Link to="/login" style={{ color: 'var(--primary-color)' }}>
                        Login
                    </Link>
                </p>
            </div>
            <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .auth-logo {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
          display: inline-block;
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
        </div>
    )
}

export default Signup
