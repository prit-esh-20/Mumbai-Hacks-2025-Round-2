import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatCurrency, storage } from '../utils/helpers'
import { generateRecommendations, isProfileComplete, getMissingFields } from '../utils/llmService'
import Sidebar from '../components/Sidebar'

function Recommendations() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [recommendations, setRecommendations] = useState([])
    const [error, setError] = useState(null)
    const [profileComplete, setProfileComplete] = useState(false)
    const [missingFields, setMissingFields] = useState([])

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        // Check if profile is complete
        const userProfile = storage.get('userProfile')
        const complete = isProfileComplete(userProfile)
        setProfileComplete(complete)

        if (!complete) {
            const missing = getMissingFields(userProfile)
            setMissingFields(missing)
            return
        }

        // Generate LLM recommendations only if profile is complete
        generateLLMRecommendations(userProfile)
    }, [user, navigate])

    const generateLLMRecommendations = async (userProfile) => {
        setLoading(true)
        setError(null)

        try {
            const llmRecommendations = await generateRecommendations(userProfile)
            setRecommendations(llmRecommendations)
        } catch (err) {
            console.error('Failed to generate recommendations:', err)
            setError('Failed to generate personalized recommendations. Please try again later.')
        } finally {
            setLoading(false)
        }
    }

    const handleRefresh = () => {
        const userProfile = storage.get('userProfile')
        if (isProfileComplete(userProfile)) {
            setProfileComplete(true)
            generateLLMRecommendations(userProfile)
        }
    }

    if (!user) return null

    return (
        <div className="dashboard-container">
            <Sidebar
                active="recommendations"
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
            />

            <main className="main-content">
                <div className="dashboard-header fade-in">
                    <div className="user-welcome">
                        <h2>AI Recommendations</h2>
                        <p>Personalized insurance plans based on your health profile.</p>
                    </div>
                    <div className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>

                {!profileComplete ? (
                    <div className="glass-card fade-in" style={{ textAlign: 'center', padding: '60px 40px' }}>
                        <i
                            className="fas fa-user-edit"
                            style={{ fontSize: '4rem', color: 'var(--primary-color)', marginBottom: '20px' }}
                        ></i>
                        <h3 style={{ marginBottom: '15px', color: 'var(--primary-color)' }}>
                            Complete Your Profile First
                        </h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px', fontSize: '1.1rem' }}>
                            Please complete your profile to get personalized AI recommendations.
                        </p>

                        {missingFields.length > 0 && (
                            <div style={{ marginBottom: '30px' }}>
                                <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>
                                    <strong>Missing Required Fields:</strong>
                                </p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {missingFields.map((field, index) => (
                                        <li
                                            key={index}
                                            style={{
                                                color: 'var(--accent-color)',
                                                marginBottom: '8px',
                                                fontSize: '0.95rem',
                                            }}
                                        >
                                            <i className="fas fa-exclamation-circle" style={{ marginRight: '8px' }}></i>
                                            {field}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <Link to="/profile" className="btn btn-primary" style={{ marginRight: '10px' }}>
                            <i className="fas fa-edit" style={{ marginRight: '8px' }}></i>
                            Complete Profile
                        </Link>
                        <button onClick={handleRefresh} className="btn btn-secondary">
                            <i className="fas fa-sync-alt" style={{ marginRight: '8px' }}></i>
                            Refresh
                        </button>
                    </div>
                ) : loading ? (
                    <div style={{ textAlign: 'center', padding: '50px' }}>
                        <i
                            className="fas fa-circle-notch fa-spin"
                            style={{ fontSize: '3rem', color: 'var(--primary-color)' }}
                        ></i>
                        <p style={{ marginTop: '20px', fontSize: '1.1rem' }}>
                            Analyzing your health profile with AI...
                        </p>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
                            Generating personalized recommendations based on your conditions
                        </p>
                    </div>
                ) : error ? (
                    <div className="glass-card fade-in" style={{ textAlign: 'center', padding: '40px' }}>
                        <i
                            className="fas fa-exclamation-triangle"
                            style={{ fontSize: '3rem', color: 'var(--accent-color)', marginBottom: '20px' }}
                        ></i>
                        <h3 style={{ marginBottom: '15px', color: 'var(--accent-color)' }}>
                            Error Generating Recommendations
                        </h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{error}</p>
                        <button onClick={handleRefresh} className="btn btn-primary">
                            <i className="fas fa-redo" style={{ marginRight: '8px' }}></i>
                            Try Again
                        </button>
                    </div>
                ) : recommendations.length === 0 ? (
                    <div className="glass-card fade-in" style={{ textAlign: 'center', padding: '40px' }}>
                        <i
                            className="fas fa-inbox"
                            style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '20px' }}
                        ></i>
                        <p style={{ color: 'var(--text-muted)' }}>No recommendations available.</p>
                        <button onClick={handleRefresh} className="btn btn-primary" style={{ marginTop: '20px' }}>
                            Generate Recommendations
                        </button>
                    </div>
                ) : (
                    <div className="fade-in">
                        <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                            <button onClick={handleRefresh} className="btn btn-secondary">
                                <i className="fas fa-sync-alt" style={{ marginRight: '8px' }}></i>
                                Regenerate
                            </button>
                        </div>

                        {recommendations.map((rec, index) => (
                            <div
                                key={index}
                                className={`glass-card rec-card slide-up delay-${(index + 1) * 100}`}
                                style={{ marginBottom: '20px', position: 'relative', overflow: 'hidden' }}
                            >
                                <div
                                    className="rec-badge"
                                    style={{
                                        position: 'absolute',
                                        top: '20px',
                                        right: '20px',
                                        background: 'linear-gradient(to right, #00b09b, #96c93d)',
                                        padding: '5px 15px',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        fontWeight: 600,
                                    }}
                                >
                                    <i className="fas fa-star"></i> {rec.score}% Match
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'flex-start',
                                        marginBottom: '20px',
                                    }}
                                >
                                    <div>
                                        <h3 style={{ color: 'var(--primary-color)' }}>{rec.name}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                            by {rec.provider}
                                        </p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <h3 style={{ color: 'var(--secondary-color)' }}>
                                            {formatCurrency(rec.premium)}
                                        </h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>per year</p>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ marginBottom: '10px' }}>
                                        <i
                                            className="fas fa-robot"
                                            style={{ color: 'var(--primary-color)', marginRight: '10px' }}
                                        ></i>
                                        <strong>Why This Plan:</strong> {rec.matchReason}
                                    </p>

                                    {rec.coverageDetails && (
                                        <p style={{ marginBottom: '10px', fontSize: '0.9rem' }}>
                                            <i
                                                className="fas fa-shield-alt"
                                                style={{ color: 'var(--secondary-color)', marginRight: '10px' }}
                                            ></i>
                                            <strong>Coverage:</strong> {rec.coverageDetails}
                                        </p>
                                    )}

                                    {rec.riskFactors && (
                                        <p style={{ marginBottom: '10px', fontSize: '0.9rem', color: 'var(--accent-color)' }}>
                                            <i className="fas fa-exclamation-triangle" style={{ marginRight: '10px' }}></i>
                                            <strong>Risk Factors:</strong> {rec.riskFactors}
                                        </p>
                                    )}

                                    {rec.exclusions && (
                                        <p style={{ marginBottom: '15px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                            <i className="fas fa-ban" style={{ marginRight: '10px' }}></i>
                                            <strong>Exclusions:</strong> {rec.exclusions}
                                        </p>
                                    )}

                                    {rec.features && rec.features.length > 0 && (
                                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                            {rec.features.map((f, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.1)',
                                                        padding: '5px 10px',
                                                        borderRadius: '15px',
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    {f}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                fontSize: '0.8rem',
                                                marginBottom: '5px',
                                            }}
                                        >
                                            <span>Coverage Score</span>
                                            <span>{rec.score}/100</span>
                                        </div>
                                        <div
                                            className="score-bar"
                                            style={{
                                                height: '8px',
                                                background: 'rgba(255, 255, 255, 0.1)',
                                                borderRadius: '4px',
                                                overflow: 'hidden',
                                            }}
                                        >
                                            <div
                                                className="score-fill"
                                                style={{
                                                    height: '100%',
                                                    background: 'var(--primary-color)',
                                                    borderRadius: '4px',
                                                    width: `${rec.score}%`,
                                                }}
                                            ></div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary" onClick={() => navigate('/insurance-details')}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default Recommendations
