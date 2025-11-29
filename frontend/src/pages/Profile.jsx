import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { storage, showToast } from '../utils/helpers'
import Sidebar from '../components/Sidebar'

function Profile() {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: 'male',
        city: '',
        conditions: '',
        hospital: '',
    })
    const [familyMembers, setFamilyMembers] = useState([])

    const DISEASE_OPTIONS = [
        'Diabetes',
        'Hypertension',
        'Asthma',
        'Heart Disease',
        'Thyroid',
        'Cancer',
        'Kidney Issues',
        'None'
    ]

    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        // Use a per-user key so profiles don't leak between accounts
        const profileKey = `userProfile_${user.email}`

        // Load existing profile
        const savedProfile = storage.get(profileKey)
        if (savedProfile) {
            setFormData({
                fullName: savedProfile.fullName || '',
                age: savedProfile.age || '',
                gender: savedProfile.gender || 'male',
                city: savedProfile.city || '',
                conditions: savedProfile.conditions || '',
                hospital: savedProfile.hospital || '',
            })
            setFamilyMembers(savedProfile.familyMembers || [])
        } else {
            setFormData((prev) => ({ ...prev, fullName: user.name || '' }))
        }
    }, [user, navigate])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const addFamilyMember = () => {
        setFamilyMembers([
            ...familyMembers,
            {
                name: '',
                age: '',
                relation: 'spouse',
                gender: '',
                diseases: ['None']
            }
        ])
    }

    const removeFamilyMember = (index) => {
        setFamilyMembers(familyMembers.filter((_, i) => i !== index))
    }

    const updateFamilyMember = (index, field, value) => {
        const updated = [...familyMembers]
        updated[index][field] = value
        setFamilyMembers(updated)
    }

    const toggleFamilyDisease = (index, disease) => {
        const updated = [...familyMembers]
        let currentDiseases = updated[index].diseases || []

        if (disease === 'None') {
            // If None is selected, clear other diseases
            currentDiseases = ['None']
        } else {
            // If other disease is selected, remove None
            if (currentDiseases.includes('None')) {
                currentDiseases = currentDiseases.filter(d => d !== 'None')
            }

            if (currentDiseases.includes(disease)) {
                currentDiseases = currentDiseases.filter(d => d !== disease)
            } else {
                currentDiseases.push(disease)
            }

            // If list becomes empty, default to None
            if (currentDiseases.length === 0) {
                currentDiseases = ['None']
            }
        }

        updated[index].diseases = currentDiseases
        setFamilyMembers(updated)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Validation
        for (let i = 0; i < familyMembers.length; i++) {
            if (!familyMembers[i].gender) {
                showToast(`Please select a gender for family member ${i + 1}`, 'error')
                return
            }
        }

        const profileData = {
            ...formData,
            familyMembers,
        }

        const profileKey = `userProfile_${user.email}`
        storage.set(profileKey, profileData)
        showToast('Profile saved successfully!', 'success')
    }

    if (!user) return null

    return (
        <div className="dashboard-container">
            <Sidebar active="profile" isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

            <main className="main-content">
                <div className="dashboard-header fade-in">
                    <div className="user-welcome">
                        <h2>My Profile</h2>
                        <p>Update your details to get better insurance recommendations.</p>
                    </div>
                    <div className="mobile-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <i className="fas fa-bars"></i>
                    </div>
                </div>

                <div className="glass-card fade-in">
                    <form onSubmit={handleSubmit}>
                        <h3 style={{ marginBottom: '20px', color: 'var(--primary-color)' }}>Personal Details</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="form-control"
                                    placeholder="Enter your name"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    name="age"
                                    className="form-control"
                                    placeholder="Enter your age"
                                    value={formData.age}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={formData.gender}
                                    onChange={handleInputChange}
                                    style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>

                        <h3 style={{ margin: '20px 0', color: 'var(--primary-color)' }}>Location & Health</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    name="city"
                                    className="form-control"
                                    placeholder="Enter your city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Pre-existing Conditions</label>
                                <input
                                    type="text"
                                    name="conditions"
                                    className="form-control"
                                    placeholder="e.g. Diabetes, Hypertension"
                                    value={formData.conditions}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Preferred Hospital</label>
                                <input
                                    type="text"
                                    name="hospital"
                                    className="form-control"
                                    placeholder="e.g. Apollo, Fortis"
                                    value={formData.hospital}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>

                        <h3 style={{ margin: '20px 0', color: 'var(--primary-color)' }}>Family Members</h3>
                        <div id="family-members-container">
                            {familyMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="glass-card"
                                    style={{ padding: '20px', marginBottom: '20px', background: 'rgba(255,255,255,0.02)' }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                                        <h4 style={{ color: 'var(--secondary-color)' }}>Family Member #{index + 1}</h4>
                                        <button
                                            type="button"
                                            onClick={() => removeFamilyMember(index)}
                                            style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer' }}
                                        >
                                            <i className="fas fa-trash"></i> Remove
                                        </button>
                                    </div>

                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '15px' }}>
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name"
                                                value={member.name}
                                                onChange={(e) => updateFamilyMember(index, 'name', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Age</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                placeholder="Age"
                                                value={member.age}
                                                onChange={(e) => updateFamilyMember(index, 'age', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Relation</label>
                                            <select
                                                className="form-control"
                                                value={member.relation}
                                                onChange={(e) => updateFamilyMember(index, 'relation', e.target.value)}
                                                style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                                            >
                                                <option value="spouse">Spouse</option>
                                                <option value="child">Child</option>
                                                <option value="parent">Parent</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="form-group" style={{ marginBottom: '15px' }}>
                                        <label style={{ display: 'block', marginBottom: '10px' }}>Gender</label>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {['Male', 'Female', 'Other'].map((g) => (
                                                <button
                                                    key={g}
                                                    type="button"
                                                    className={`btn ${member.gender === g ? 'btn-primary' : 'btn-outline'}`}
                                                    onClick={() => updateFamilyMember(index, 'gender', g)}
                                                    style={{
                                                        flex: 1,
                                                        padding: '8px',
                                                        background: member.gender === g ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                                                        border: member.gender === g ? 'none' : '1px solid rgba(255,255,255,0.1)'
                                                    }}
                                                >
                                                    {g}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label style={{ display: 'block', marginBottom: '10px' }}>Pre-existing Conditions</label>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {DISEASE_OPTIONS.map((disease) => (
                                                <button
                                                    key={disease}
                                                    type="button"
                                                    onClick={() => toggleFamilyDisease(index, disease)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        borderRadius: '20px',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        fontSize: '0.9rem',
                                                        background: member.diseases?.includes(disease)
                                                            ? 'var(--secondary-color)'
                                                            : 'rgba(255,255,255,0.1)',
                                                        color: '#fff',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                >
                                                    {member.diseases?.includes(disease) && <i className="fas fa-check" style={{ marginRight: '5px' }}></i>}
                                                    {disease}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={addFamilyMember}
                            className="btn btn-secondary"
                            style={{ marginBottom: '20px' }}
                        >
                            <i className="fas fa-plus"></i> Add Family Member
                        </button>

                        <div style={{ marginTop: '30px', textAlign: 'right' }}>
                            <button type="submit" className="btn btn-primary">
                                Save Profile
                            </button>
                        </div>
                    </form>
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

        .btn-outline {
            color: var(--text-color);
        }
        
        .btn-outline:hover {
            background: rgba(255,255,255,0.1) !important;
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

export default Profile
