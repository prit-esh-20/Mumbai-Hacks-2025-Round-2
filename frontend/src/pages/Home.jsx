import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Home() {
  const { user } = useAuth()

  return (
    <>
      <Navbar />
      <main>
        <section id="home" className="hero container">
          <div className="hero-content fade-in">
            <h1>AI-Powered Health Insurance Advisor</h1>
            <p>
              Find the perfect health insurance plan for you and your family with our advanced AI
              recommendation engine. Simple, transparent, and personalized.
            </p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started Free
              </Link>
              <a href="#features" className="btn btn-secondary" style={{ marginLeft: '15px' }}>
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-visual slide-up delay-200">
            <div className="hero-card float">
              <h3>Smart Protection</h3>
              <p style={{ marginBottom: '20px', fontSize: '0.9rem' }}>
                AI analysis of your health profile to find the best coverage.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(79, 172, 254, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className="fas fa-check" style={{ color: 'var(--primary-color)' }}></i>
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Full Coverage</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Includes critical illness
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(0, 242, 254, 0.2)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <i className="fas fa-rupee-sign" style={{ color: 'var(--secondary-color)' }}></i>
                </div>
                <div>
                  <div style={{ fontWeight: 600 }}>Best Prices</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Save up to 30%</div>
                </div>
              </div>
              <div className="floating-icon icon-1 float delay-100">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div className="floating-icon icon-2 float delay-300">
                <i className="fas fa-robot"></i>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features container">
          <div className="section-title fade-in">
            <h2>Why Choose MediNest?</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              We combine healthcare expertise with cutting-edge AI technology.
            </p>
          </div>
          <div className="features-grid">
            <div className="glass-card feature-item slide-up delay-100">
              <div className="feature-icon">
                <i className="fas fa-brain"></i>
              </div>
              <h3>AI-Driven Health Profile Analysis</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Advanced algorithms analyze your health data to recommend the best coverage
              </p>
            </div>
            <div className="glass-card feature-item slide-up delay-200">
              <div className="feature-icon">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <h3>Location-Based Hospital Mapping</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Find insurance plans that cover hospitals in your area
              </p>
            </div>
            <div className="glass-card feature-item slide-up delay-300">
              <div className="feature-icon">
                <i className="fas fa-search"></i>
              </div>
              <h3>Coverage Gap Detection</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Identify missing coverage for medicines and treatments
              </p>
            </div>
            <div className="glass-card feature-item slide-up delay-100">
              <div className="feature-icon">
                <i className="fas fa-file-contract"></i>
              </div>
              <h3>Policy Simplification</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Removes jargon and explains policies in simple terms
              </p>
            </div>
            <div className="glass-card feature-item slide-up delay-200">
              <div className="feature-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Family Plan Customization</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Tailor insurance plans for your entire family's needs
              </p>
            </div>
            <div className="glass-card feature-item slide-up delay-300">
              <div className="feature-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Cost Optimization</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Find the most cost-effective plans without compromising coverage
              </p>
            </div>
          </div>
        </section>

        <section className="statistics container">
          <div className="section-title fade-in">
            <h2>Data-Driven Insights</h2>
            <p style={{ color: 'var(--text-muted)' }}>
              See how MediNest helps you save money and get better coverage
            </p>
          </div>

          <div className="stats-grid">
            {/* Cost Comparison Graph */}
            <div className="glass-card stat-card slide-up delay-100">
              <h3 style={{ marginBottom: '30px', color: 'var(--primary-color)' }}>
                <i className="fas fa-rupee-sign" style={{ marginRight: '10px' }}></i>
                Average Annual Premium Comparison
              </h3>
              <div className="chart-container">
                <div className="bar-group">
                  <div className="bar-label">Traditional Search</div>
                  <div className="bar-wrapper">
                    <div className="bar bar-traditional" data-value="18500">
                      <span className="bar-value">₹18,500</span>
                    </div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">MediNest AI</div>
                  <div className="bar-wrapper">
                    <div className="bar bar-medinest" data-value="12800">
                      <span className="bar-value">₹12,800</span>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--secondary-color)', fontWeight: 600 }}>
                <i className="fas fa-arrow-down"></i> Save up to 31% with AI recommendations
              </p>
            </div>

            {/* Coverage Analysis Graph */}
            <div className="glass-card stat-card slide-up delay-200">
              <h3 style={{ marginBottom: '30px', color: 'var(--primary-color)' }}>
                <i className="fas fa-shield-alt" style={{ marginRight: '10px' }}></i>
                Coverage Completeness Score
              </h3>
              <div className="chart-container">
                <div className="bar-group">
                  <div className="bar-label">Basic Plans</div>
                  <div className="bar-wrapper">
                    <div className="bar bar-basic" data-value="65">
                      <span className="bar-value">65%</span>
                    </div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">Standard Plans</div>
                  <div className="bar-wrapper">
                    <div className="bar bar-standard" data-value="78">
                      <span className="bar-value">78%</span>
                    </div>
                  </div>
                </div>
                <div className="bar-group">
                  <div className="bar-label">AI-Optimized</div>
                  <div className="bar-wrapper">
                    <div className="bar bar-optimized" data-value="94">
                      <span className="bar-value">94%</span>
                    </div>
                  </div>
                </div>
              </div>
              <p style={{ marginTop: '20px', textAlign: 'center', color: 'var(--secondary-color)', fontWeight: 600 }}>
                <i className="fas fa-check-circle"></i> AI finds plans covering 94% of your needs
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <style jsx>{`
        .hero {
          padding: 150px 0 100px;
          display: flex;
          align-items: center;
          min-height: 100vh;
        }

        .hero-content {
          flex: 1;
          padding-right: 50px;
        }

        .hero h1 {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          line-height: 1.2;
          background: linear-gradient(to right, #fff, #b3e5fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .hero p {
          font-size: 1.1rem;
          color: var(--text-muted);
          margin-bottom: 30px;
          max-width: 600px;
        }

        .hero-visual {
          flex: 1;
          position: relative;
        }

        .hero-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          padding: 30px;
          position: relative;
          z-index: 1;
        }

        .floating-icon {
          position: absolute;
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          border: 1px solid var(--glass-border);
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          color: var(--secondary-color);
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
        }

        .icon-1 {
          top: -30px;
          right: -30px;
        }
        .icon-2 {
          bottom: -30px;
          left: -30px;
        }

        .features {
          padding: 100px 0;
        }

        .section-title {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
        }

        .feature-item {
          text-align: center;
        }

        .feature-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 20px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: var(--primary-color);
          border: 1px solid var(--glass-border);
        }

        .statistics {
          padding: 100px 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 40px;
        }

        .stat-card {
          padding: 2.5rem;
        }

        .chart-container {
          display: flex;
          flex-direction: column;
          gap: 25px;
        }

        .bar-group {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .bar-label {
          min-width: 140px;
          font-weight: 600;
          color: var(--text-muted);
          font-size: 0.9rem;
        }

        .bar-wrapper {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          height: 40px;
        }

        .bar {
          height: 100%;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding-right: 15px;
          position: relative;
          animation: barGrow 1.5s ease-out forwards;
          transform-origin: left;
        }

        @keyframes barGrow {
          from {
            width: 0;
          }
        }

        .bar-traditional {
          background: linear-gradient(90deg, rgba(255, 107, 107, 0.6), rgba(255, 107, 107, 0.9));
          width: 92%;
          box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
        }

        .bar-medinest {
          background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
          width: 64%;
          box-shadow: 0 0 20px rgba(79, 172, 254, 0.4);
        }

        .bar-basic {
          background: linear-gradient(90deg, rgba(255, 193, 7, 0.6), rgba(255, 193, 7, 0.9));
          width: 65%;
          box-shadow: 0 0 15px rgba(255, 193, 7, 0.3);
        }

        .bar-standard {
          background: linear-gradient(90deg, rgba(33, 150, 243, 0.6), rgba(33, 150, 243, 0.9));
          width: 78%;
          box-shadow: 0 0 15px rgba(33, 150, 243, 0.3);
        }

        .bar-optimized {
          background: linear-gradient(90deg, rgba(76, 175, 80, 0.6), rgba(76, 175, 80, 0.9));
          width: 94%;
          box-shadow: 0 0 20px rgba(76, 175, 80, 0.4);
        }

        .bar-value {
          font-weight: 700;
          font-size: 0.9rem;
          color: #fff;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            padding-top: 120px;
            text-align: center;
          }

          .hero-content {
            padding-right: 0;
            margin-bottom: 50px;
          }

          .hero h1 {
            font-size: 2.5rem;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }

          .bar-label {
            min-width: 100px;
            font-size: 0.8rem;
          }
        }
      `}</style>
    </>
  )
}

export default Home
