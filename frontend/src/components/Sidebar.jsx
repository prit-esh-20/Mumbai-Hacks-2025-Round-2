import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar({ active, isOpen, onToggle }) {
    const { logout } = useAuth()

    const handleLogout = (e) => {
        e.preventDefault()
        logout()
        window.location.href = '/'
    }

    return (
        <aside className={`sidebar ${isOpen ? 'active' : ''}`}>
            <div className="sidebar-logo">
                <i className="fas fa-heartbeat"></i> MediNest
            </div>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/dashboard" className={`menu-item ${active === 'dashboard' ? 'active' : ''}`}>
                        <i className="fas fa-th-large"></i> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/profile" className={`menu-item ${active === 'profile' ? 'active' : ''}`}>
                        <i className="fas fa-user"></i> My Profile
                    </Link>
                </li>
                <li>
                    <Link
                        to="/recommendations"
                        className={`menu-item ${active === 'recommendations' ? 'active' : ''}`}
                    >
                        <i className="fas fa-magic"></i> Recommendations
                    </Link>
                </li>
                <li>
                    <Link to="/insurance" className={`menu-item ${active === 'insurance' ? 'active' : ''}`}>
                        <i className="fas fa-search"></i> Browse Plans
                    </Link>
                </li>
            </ul>
            <div className="sidebar-footer">
                <a href="#" onClick={handleLogout} className="menu-item">
                    <i className="fas fa-sign-out-alt"></i> Logout
                </a>
            </div>

            <style jsx>{`
        .sidebar {
          width: 250px;
          background: rgba(15, 12, 41, 0.95);
          backdrop-filter: blur(10px);
          border-right: 1px solid var(--glass-border);
          padding: 20px;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 100;
          transition: transform 0.3s ease;
        }

        .sidebar-logo {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 40px;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .sidebar-menu {
          flex: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 15px;
          color: var(--text-muted);
          border-radius: 10px;
          margin-bottom: 5px;
          transition: all 0.3s ease;
        }

        .menu-item:hover,
        .menu-item.active {
          background: rgba(255, 255, 255, 0.1);
          color: var(--primary-color);
        }

        .menu-item i {
          width: 20px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
          }

          .sidebar.active {
            transform: translateX(0);
          }
        }
      `}</style>
        </aside>
    )
}

export default Sidebar
