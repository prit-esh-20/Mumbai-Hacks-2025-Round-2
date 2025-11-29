import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { formatCurrency } from '../utils/helpers'
import Sidebar from '../components/Sidebar'

const INSURANCE_PLANS = [
    {
        id: 1,
        name: 'Care Plus',
        provider: 'Care Health',
        premium: 12500,
        coverage: 500000,
        features: ['No Copay', 'Free Health Checkup', 'Cashless Treatment', 'Global Coverage'],
    },
    {
        id: 2,
        name: 'Optima Restore',
        provider: 'HDFC ERGO',
        premium: 15000,
        coverage: 1000000,
        features: ['Restore Benefit', '2x Coverage', 'No Claim Bonus', 'Daily Cash'],
    },
    {
        id: 3,
        name: 'Health Companion',
        provider: 'Niva Bupa',
        premium: 11000,
        coverage: 500000,
        features: ['Direct Claim Settlement', 'Refill Benefit', 'Alternative Treatment'],
    },
    {
        id: 4,
        name: 'Activ Health',
        provider: 'Aditya Birla',
        premium: 13500,
        coverage: 700000,
        features: ['Chronic Management', 'Health Returns', 'Day Care Procedures'],
    },
    {
        id: 5,
        name: 'Young Star',
        provider: 'Star Health',
        premium: 9000,
        coverage: 300000,
        features: ['Mid-term Inclusion', 'Wellness Program', 'E-Medical Opinion'],
    },
    {
        id: 6,
        name: 'ProHealth',
        provider: 'Manipal Cigna',
        premium: 14000,
        coverage: 1000000,
        features: ['Unlimited Restoration', 'Healthy Rewards', 'Worldwide Emergency'],
    },
]

function Insurance() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filteredPlans, setFilteredPlans] = useState(INSURANCE_PLANS)

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    useEffect(() => {
        const filtered = INSURANCE_PLANS.filter(
            (plan) =>
                plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plan.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
                plan.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        setFilteredPlans(filtered)
    }, [searchTerm])

    if (!user) return null

    return (
        <div className="dashboard-container">
            <Sidebar active="insurance" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            <main className="main-content">
                <div className="dashboard-header fade-in">
                    <div className="user-welcome">
                        <h2>Browse Insurance Plans</h2>
                        <p>Explore top health insurance plans available for you.</p>
                    </div>
                    <div className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>

                <div className="search-bar fade-in" style={{ marginBottom: '30px', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search by provider, plan name, or coverage..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '15px 50px 15px 20px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '50px',
                            color: '#fff',
                            fontSize: '1rem',
                        }}
                    />
                    <i
                        className="fas fa-search"
                        style={{
                            position: 'absolute',
                            right: '20px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--text-muted)',
                        }}
                    ></i>
                </div>

                <div className="insurance-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                    {filteredPlans.length === 0 ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-muted)' }}>
                            No plans found.
                        </p>
                    ) : (
                        filteredPlans.map((plan, index) => (
                            <div
                                key={plan.id}
                                className={`glass-card plan-card slide-up delay-${((index % 3) + 1) * 100}`}
                                style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                                    <div>
                                        <h3 style={{ color: 'var(--primary-color)' }}>{plan.name}</h3>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{plan.provider}</p>
                                    </div>
                                    <div className="plan-price">
                                        {formatCurrency(plan.premium)}
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 400 }}>/yr</span>
                                    </div>
                                </div>

                                <div className="plan-features" style={{ flex: 1, marginBottom: '20px' }}>
                                    <p style={{ marginBottom: '10px', fontWeight: 600 }}>
                                        Coverage: {formatCurrency(plan.coverage)}
                                    </p>
                                    <ul style={{ listStyle: 'none' }}>
                                        {plan.features.slice(0, 3).map((f, i) => (
                                            <li
                                                key={i}
                                                style={{
                                                    marginBottom: '8px',
                                                    color: 'var(--text-muted)',
                                                    fontSize: '0.9rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '10px',
                                                }}
                                            >
                                                <i className="fas fa-check-circle" style={{ color: 'var(--primary-color)' }}></i> {f}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <button
                                    className="btn btn-secondary btn-block"
                                    onClick={() => navigate(`/insurance-details?id=${plan.id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        ))
                    )}
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

        .plan-price {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--secondary-color);
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

export default Insurance
