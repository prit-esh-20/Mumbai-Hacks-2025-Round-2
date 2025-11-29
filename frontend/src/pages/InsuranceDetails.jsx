import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Sidebar from '../components/Sidebar'

function InsuranceDetails() {
    const { user } = useAuth()
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
            <Sidebar active="insurance" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            <main className="main-content">
                <div className="dashboard-header fade-in">
                    <div className="user-welcome">
                        <Link to="/insurance" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <i className="fas fa-arrow-left"></i> Back to Plans
                        </Link>
                    </div>
                    <div className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>

                <div className="glass-card fade-in">
                    <div className="detail-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--glass-border)' }}>
                        <div>
                            <h1 style={{ color: 'var(--primary-color)', marginBottom: '5px' }}>
                                Care Plus Health Insurance
                            </h1>
                            <p style={{ color: 'var(--text-muted)' }}>Provided by Care Health</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h2 style={{ color: 'var(--secondary-color)' }}>₹12,500</h2>
                            <p style={{ color: 'var(--text-muted)' }}>per year</p>
                        </div>
                    </div>

                    <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                        <div>
                            <h3>Plan Highlights</h3>
                            <p style={{ color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.8 }}>
                                This comprehensive health insurance plan offers extensive coverage for you and your
                                family. It includes cashless treatment at over 5000+ network hospitals, covers pre and
                                post-hospitalization expenses, and provides free annual health checkups.
                            </p>

                            <h3 style={{ marginTop: '30px' }}>Key Features</h3>
                            <div className="feature-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
                                <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <i className="fas fa-hospital-alt" style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}></i>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Cashless</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>5000+ Hospitals</div>
                                    </div>
                                </div>
                                <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <i className="fas fa-user-md" style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}></i>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Checkups</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Free Annual</div>
                                    </div>
                                </div>
                                <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <i className="fas fa-globe" style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}></i>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>Coverage</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Global Assist</div>
                                    </div>
                                </div>
                                <div className="feature-box" style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '15px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <i className="fas fa-file-invoice-dollar" style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}></i>
                                    <div>
                                        <div style={{ fontWeight: 600 }}>No Claim Bonus</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Up to 50%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="glass-card" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px' }}>
                                <h3 style={{ marginBottom: '20px' }}>Summary</h3>
                                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Coverage Amount</span>
                                    <span>₹5,00,000</span>
                                </div>
                                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Policy Term</span>
                                    <span>1 Year</span>
                                </div>
                                <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-muted)' }}>Waiting Period</span>
                                    <span>30 Days</span>
                                </div>
                                <hr style={{ borderColor: 'var(--glass-border)', margin: '20px 0' }} />
                                <button className="btn btn-primary btn-block">Buy Now</button>
                                <button className="btn btn-secondary btn-block" style={{ marginTop: '10px' }}>
                                    Add to Compare
                                </button>
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

        .mobile-toggle {
          display: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 0;
          }

          .mobile-toggle {
            display: block;
          }

          .detail-header {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 20px;
          }
        }
      `}</style>
        </div>
    )
}

export default InsuranceDetails
