import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Pricing() {
    const plans = [
        {
            name: 'Free Plan',
            price: '₹0',
            period: '/month',
            features: [
                '5 total AI queries (one-time trial)',
                'Basic coverage gap detection',
                'Basic policy simplification',
                'Hospital lookup (3 results limit)',
                'No history saving',
            ],
            buttonText: 'Get Started',
            buttonClass: 'btn-secondary',
            popular: false,
        },
        {
            name: 'Silver Plan',
            price: '₹199',
            period: '/month',
            altPrice: '₹499 for 3 months',
            features: [
                '50 AI queries per month',
                'Full coverage gap detection',
                'Advanced policy simplification',
                'Save up to 10 health profiles',
                'Standard support',
            ],
            buttonText: 'Choose Silver',
            buttonClass: 'btn-primary',
            popular: true,
        },
        {
            name: 'Platinum Plan',
            price: '₹599',
            period: '/month',
            altPrice: '₹1299 for 3 months',
            features: [
                'Unlimited AI usage',
                'AI health profile analysis',
                'Family plan for unlimited members',
                'Personalized recommendations',
                'Advanced cost optimization',
                'Report downloads',
                'Priority support',
            ],
            buttonText: 'Choose Platinum',
            buttonClass: 'btn-primary',
            popular: false,
        },
    ]

    return (
        <>
            <Navbar />
            <main>
                <section className="pricing-section container">
                    <div className="section-title fade-in">
                        <h2>Try Subscriptions</h2>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Choose the perfect plan for your health insurance journey
                        </p>
                    </div>

                    <div className="pricing-grid">
                        {plans.map((plan, index) => (
                            <div
                                key={index}
                                className={`glass-card pricing-card slide-up delay-${(index + 1) * 100} ${plan.popular ? 'popular' : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="popular-badge">
                                        <i className="fas fa-star"></i> Most Popular
                                    </div>
                                )}
                                <h3 className="plan-name">{plan.name}</h3>
                                <div className="plan-price">
                                    <span className="price">{plan.price}</span>
                                    <span className="period">{plan.period}</span>
                                </div>
                                {plan.altPrice && (
                                    <p className="alt-price">{plan.altPrice}</p>
                                )}
                                <ul className="features-list">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx}>
                                            <i className="fas fa-check-circle"></i>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <Link to="/signup" className={`btn ${plan.buttonClass} btn-block`}>
                                    {plan.buttonText}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="pricing-note fade-in" style={{ marginTop: '60px', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
                            All plans include secure data storage and 24/7 platform access
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
            <style jsx>{`
        .pricing-section {
          padding: 150px 0 100px;
          min-height: 100vh;
        }

        .section-title {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-title h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
        }

        .pricing-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1100px;
          margin: 0 auto;
        }

        .pricing-card {
          position: relative;
          text-align: center;
          padding: 2.5rem 2rem;
          transition: all 0.3s ease;
        }

        .pricing-card.popular {
          border: 2px solid var(--primary-color);
          transform: scale(1.05);
        }

        .pricing-card:hover {
          transform: translateY(-10px);
        }

        .pricing-card.popular:hover {
          transform: translateY(-10px) scale(1.05);
        }

        .popular-badge {
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);
          background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
          color: #fff;
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          box-shadow: 0 4px 15px rgba(79, 172, 254, 0.4);
        }

        .plan-name {
          font-size: 1.5rem;
          margin-bottom: 20px;
          color: var(--primary-color);
        }

        .plan-price {
          margin-bottom: 10px;
        }

        .price {
          font-size: 3rem;
          font-weight: 700;
          color: #fff;
        }

        .period {
          font-size: 1rem;
          color: var(--text-muted);
          margin-left: 5px;
        }

        .alt-price {
          color: var(--secondary-color);
          font-size: 0.9rem;
          margin-bottom: 30px;
          font-weight: 600;
        }

        .features-list {
          list-style: none;
          margin: 30px 0;
          text-align: left;
        }

        .features-list li {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 15px;
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .features-list i {
          color: var(--primary-color);
          margin-top: 3px;
          flex-shrink: 0;
        }

        .pricing-note {
          background: rgba(255, 255, 255, 0.05);
          padding: 20px;
          border-radius: 10px;
          border: 1px solid var(--glass-border);
        }

        @media (max-width: 768px) {
          .pricing-section {
            padding-top: 120px;
          }

          .pricing-grid {
            grid-template-columns: 1fr;
          }

          .pricing-card.popular {
            transform: scale(1);
          }

          .pricing-card.popular:hover {
            transform: translateY(-10px) scale(1);
          }

          .section-title h2 {
            font-size: 2rem;
          }

          .price {
            font-size: 2.5rem;
          }
        }
      `}</style>
        </>
    )
}

export default Pricing
