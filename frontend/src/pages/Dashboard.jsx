import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

function Dashboard() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    if (!user) return null

    return (
        <div className="dashboard-container">
            <Sidebar active="dashboard" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            <main className="main-content">
                <div className="dashboard-header fade-in">
                    <div className="user-welcome">
                        <h2>Welcome, {user.name}!</h2>
                        <p>Here's what's happening with your insurance journey.</p>
                    </div>
                    <div className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="fas fa-bars"></i>
                    </div>
                    <div
                        className="user-avatar"
                        style={{
                            width: '40px',
                            height: '40px',
                            background: 'var(--primary-color)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                        }}
                    >
                        <span>{user.name.charAt(0).toUpperCase()}</span>
                    </div>
                </div>

                <div className="dashboard-grid">
                    <div
                        className="glass-card action-card slide-up delay-100"
                        onClick={() => navigate('/profile')}
                    >
                        <div className="action-icon">
                            <i className="fas fa-users"></i>
                        </div>
                        <h3>Create Profile</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Add family details for better plans
                        </p>
                    </div>

                    <div
                        className="glass-card action-card slide-up delay-200"
                        onClick={() => navigate('/recommendations')}
                    >
                        <div className="action-icon">
                            <i className="fas fa-robot"></i>
                        </div>
                        <h3>Get Advice</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            AI-powered plan recommendations
                        </p>
                    </div>

                    <div
                        className="glass-card action-card slide-up delay-300"
                        onClick={() => navigate('/insurance')}
                    >
                        <div className="action-icon">
                            <i className="fas fa-file-medical-alt"></i>
                        </div>
                        <h3>Browse Plans</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            Explore all available options
                        </p>
                    </div>
                </div>

                <div className="glass-card recent-activity slide-up delay-300">
                    <h3 style={{ marginBottom: '20px' }}>Recent Activity</h3>
                    <div className="activity-list">
                        <div className="activity-item">
                            <div
                                style={{
                                    width: '10px',
                                    height: '10px',
                                    background: 'var(--secondary-color)',
                                    borderRadius: '50%',
                                }}
                            ></div>
                            <div>
                                <div style={{ fontWeight: 600 }}>Account Created</div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Just now</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <style jsx>{`
        .dashboard-container {
          display: flex;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          margin-left: 250px;
          padding: 30px;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .user-welcome h2 {
          font-size: 1.8rem;
          margin-bottom: 5px;
        }

        .user-welcome p {
          color: var(--text-muted);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-bottom: 30px;
        }

        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
        }

        .action-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--primary-color);
          margin-bottom: 15px;
          border: 1px solid var(--glass-border);
          transition: all 0.3s ease;
        }

        .action-card:hover .action-icon {
          background: var(--primary-color);
          color: #fff;
          transform: scale(1.1);
        }

        .recent-activity {
          margin-top: 30px;
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-bottom: 1px solid var(--glass-border);
        }

        .activity-item:last-child {
          border-bottom: none;
        }

        .mobile-toggle {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }

          .mobile-toggle {
            display: block;
          }
        }
      `}</style>
        </div>
    )
}

export default Dashboard
