function Footer() {
    return (
        <footer>
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <div className="logo" style={{ marginBottom: '15px' }}>
                            <i className="fas fa-heartbeat"></i> MediNest
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>Simplifying health insurance for everyone.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>
                                <a href="#home">Home</a>
                            </li>
                            <li>
                                <a href="#features">Features</a>
                            </li>
                            <li>
                                <a href="/login">Login</a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Contact</h4>
                        <ul>
                            <li>
                                <a href="#">support@medinest.com</a>
                            </li>
                            <li>
                                <a href="#">+91 98765 43210</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 MediNest. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
