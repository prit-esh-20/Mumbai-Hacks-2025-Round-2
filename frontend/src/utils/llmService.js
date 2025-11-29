// LLM Service for generating personalized insurance recommendations
// This uses Google's Gemini API with a robust local fallback

const GEMINI_API_KEY = 'AIzaSyA38YTiJOhigqKngnhq5yckkKaAjyMZTyo' // Replace with your actual API key
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export const generateRecommendations = async (userProfile) => {
    const prompt = `You are an expert health insurance advisor AI. Analyze the following complete health profile and generate 3 personalized insurance plan recommendations.

USER HEALTH PROFILE:
- Name: ${userProfile.fullName}
- Age: ${userProfile.age} years
- Gender: ${userProfile.gender}
- City/Location: ${userProfile.city}
- Pre-existing Conditions/Diseases: ${userProfile.conditions || 'None'}
- Preferred Hospital: ${userProfile.hospital || 'Any'}
- Family Members: ${userProfile.familyMembers?.length || 0} (${userProfile.familyMembers?.map(m => `${m.relation} age ${m.age}`).join(', ') || 'None'})

STRICT REQUIREMENTS:
1. Base ALL recommendations on the user's specific diseases, age, and health conditions listed above
2. Each recommendation MUST be different and personalized to their exact health profile
3. If they have diabetes, hypertension, or other conditions - recommendations MUST address these specifically
4. DO NOT give generic advice - every recommendation should reference their actual conditions
5. Consider their age, location, and family situation
6. Provide realistic premium estimates based on their risk profile

RETURN FORMAT (JSON):
Return ONLY a valid JSON array with exactly 3 recommendations. Each recommendation must have:
{
  "name": "Plan Name",
  "provider": "Insurance Provider",
  "premium": number (annual premium in INR),
  "coverage": number (coverage amount in INR),
  "score": number (1-100 match score),
  "matchReason": "Why this plan suits their SPECIFIC conditions and profile",
  "features": ["feature1", "feature2", "feature3"],
  "coverageDetails": "What this covers for their specific diseases",
  "exclusions": "Important exclusions related to their conditions",
  "riskFactors": "Risk factors based on their health profile"
}

IMPORTANT: Return ONLY the JSON array, no other text. Make sure each plan is truly personalized to their conditions.`

    try {
        console.log('Calling Gemini API with profile:', userProfile)

        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }]
            })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            console.warn('API Request Failed, switching to local fallback:', errorData)
            throw new Error(`API Error: ${response.status}`)
        }

        const data = await response.json()
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text

        if (!generatedText) {
            throw new Error('No text in response')
        }

        // Extract JSON
        let jsonText = generatedText.trim()
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '')
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '')
        }

        const recommendations = JSON.parse(jsonText)

        if (!Array.isArray(recommendations) || recommendations.length === 0) {
            throw new Error('Invalid recommendations format')
        }

        return recommendations

    } catch (error) {
        console.error('LLM API Failed, using local personalized fallback:', error)
        return generateLocalFallback(userProfile)
    }
}

// Local Fallback Generator (Personalized logic without API)
const generateLocalFallback = (profile) => {
    const conditions = profile.conditions?.toLowerCase() || ''
    const age = parseInt(profile.age) || 30
    const hasDiabetes = conditions.includes('diabetes') || conditions.includes('sugar')
    const hasBP = conditions.includes('bp') || conditions.includes('hypertension') || conditions.includes('pressure')
    const hasHeart = conditions.includes('heart') || conditions.includes('cardio')

    let basePremium = 10000 + (age * 200)
    if (hasDiabetes) basePremium += 5000
    if (hasBP) basePremium += 3000
    if (hasHeart) basePremium += 8000

    const recommendations = []

    // Plan 1: Condition Specific or Comprehensive
    recommendations.push({
        name: hasDiabetes ? 'Diabetes Care Pro' : (hasHeart ? 'Heart Secure Gold' : 'Optima Restore'),
        provider: hasDiabetes ? 'Care Health' : (hasHeart ? 'Star Health' : 'HDFC ERGO'),
        premium: basePremium,
        coverage: 1000000,
        score: 95,
        matchReason: hasDiabetes
            ? `Specifically designed for diabetes management with coverage for insulin and regular checkups.`
            : (hasHeart ? `Specialized cardiac care coverage essential for your heart condition.` : `Best comprehensive coverage for your age group in ${profile.city}.`),
        features: [
            hasDiabetes ? 'Insulin Cover' : 'No Claim Bonus',
            'Cashless Treatment',
            'Annual Health Checkup'
        ],
        coverageDetails: hasDiabetes
            ? 'Covers hospitalization due to diabetes complications and insulin costs.'
            : 'Comprehensive hospitalization coverage including pre/post expenses.',
        exclusions: 'Waiting period of 2 years for pre-existing conditions.',
        riskFactors: hasDiabetes || hasBP || hasHeart
            ? 'Higher premium due to pre-existing conditions.'
            : 'Standard risk profile for your age.'
    })

    // Plan 2: Value Plan
    recommendations.push({
        name: 'Health Companion',
        provider: 'Niva Bupa',
        premium: basePremium * 0.8,
        coverage: 500000,
        score: 88,
        matchReason: 'Most cost-effective option providing essential coverage for your needs.',
        features: ['Refill Benefit', 'Direct Claim Settlement', 'Tax Benefit'],
        coverageDetails: 'Standard hospitalization coverage with refill benefit.',
        exclusions: 'Cosmetic treatments and non-medical expenses.',
        riskFactors: 'Lower coverage amount might be insufficient for major surgeries.'
    })

    // Plan 3: Premium Plan
    recommendations.push({
        name: 'ReAssure 2.0',
        provider: 'Niva Bupa',
        premium: basePremium * 1.3,
        coverage: 2500000,
        score: 82,
        matchReason: 'Maximum coverage with unlimited restoration, ideal for long-term security.',
        features: ['Unlimited Restoration', 'Lock the Clock', 'Booster Benefit'],
        coverageDetails: 'Extensive coverage for all major illnesses and modern treatments.',
        exclusions: 'Experimental treatments.',
        riskFactors: 'Higher premium cost.'
    })

    return recommendations
}

// Check if user profile is complete
export const isProfileComplete = (profile) => {
    if (!profile) return false
    const requiredFields = ['fullName', 'age', 'gender', 'city', 'conditions']
    for (const field of requiredFields) {
        if (!profile[field] || profile[field].toString().trim() === '') {
            return false
        }
    }
    return true
}

// Get missing fields for user feedback
export const getMissingFields = (profile) => {
    if (!profile) {
        return ['Full Name', 'Age', 'Gender', 'City', 'Pre-existing Conditions']
    }
    const fieldLabels = {
        fullName: 'Full Name',
        age: 'Age',
        gender: 'Gender',
        city: 'City',
        conditions: 'Pre-existing Conditions'
    }
    const missing = []
    for (const [field, label] of Object.entries(fieldLabels)) {
        if (!profile[field] || profile[field].toString().trim() === '') {
            missing.push(label)
        }
    }
    return missing
}
