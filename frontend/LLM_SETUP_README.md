# MediNest LLM Integration Setup

## Overview
The Recommendations page now uses a real LLM (Google Gemini) to generate personalized insurance recommendations based on the user's complete health profile.

## Features Implemented

### ✅ Strict Profile Completion Check
- **NO recommendations** are shown if the profile is incomplete
- Users must fill ALL required fields:
  - Full Name
  - Age
  - Gender
  - City
  - Pre-existing Conditions/Diseases
- Missing fields are clearly displayed to the user
- "Complete Profile" button redirects to profile page

### ✅ Personalized LLM Recommendations
- Each recommendation is generated based on the user's:
  - Specific diseases and conditions
  - Age and gender
  - Location (city)
  - Family members
  - Preferred hospital
- **NO hardcoded recommendations** - everything comes from the LLM
- Different users with different profiles get different recommendations

### ✅ LLM Prompt Engineering
The LLM prompt includes:
- Full user health profile data
- Strict instructions to personalize based on diseases
- Requirements for coverage details, risk factors, and exclusions
- JSON output format for easy parsing

### ✅ Error Handling
- Loading state while LLM generates recommendations
- Error messages if LLM fails
- Retry/Refresh functionality
- Empty state handling

## Setup Instructions

### 1. Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Add API Key to the Project

Open `src/utils/llmService.js` and replace the placeholder:

\`\`\`javascript
const GEMINI_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE'
\`\`\`

**IMPORTANT**: Never commit your API key to version control!

### 3. Alternative: Use Environment Variables (Recommended)

Create a `.env` file in the `frontend` directory:

\`\`\`
VITE_GEMINI_API_KEY=your_actual_api_key_here
\`\`\`

Then update `llmService.js`:

\`\`\`javascript
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
\`\`\`

Add `.env` to your `.gitignore`:
\`\`\`
.env
\`\`\`

### 4. Using a Different LLM

If you want to use OpenAI, Claude, or another LLM instead of Gemini:

1. Update the API endpoint in `llmService.js`
2. Modify the request format to match your LLM's API
3. Adjust the response parsing logic

Example for OpenAI:
\`\`\`javascript
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': \`Bearer \${OPENAI_API_KEY}\`
  },
  body: JSON.stringify({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  })
})
\`\`\`

## How It Works

### Flow:
1. User navigates to Recommendations page
2. System checks if profile is complete
3. If incomplete → Show missing fields message
4. If complete → Call LLM with full profile data
5. LLM generates 3 personalized recommendations
6. Display recommendations with all details

### Profile Validation:
\`\`\`javascript
const requiredFields = ['fullName', 'age', 'gender', 'city', 'conditions']
\`\`\`

All fields must be filled with non-empty values.

### LLM Response Format:
\`\`\`json
[
  {
    "name": "Plan Name",
    "provider": "Provider Name",
    "premium": 12500,
    "coverage": 500000,
    "score": 92,
    "matchReason": "Personalized reason based on user's conditions",
    "features": ["Feature 1", "Feature 2"],
    "coverageDetails": "What this covers for their diseases",
    "exclusions": "Important exclusions",
    "riskFactors": "Risk factors based on their profile"
  }
]
\`\`\`

## Testing

### Test Case 1: Incomplete Profile
1. Don't fill all profile fields
2. Go to Recommendations
3. Should see "Complete Your Profile First" message
4. Should list missing fields

### Test Case 2: Complete Profile with Diabetes
1. Fill profile with "Diabetes" in conditions
2. Go to Recommendations
3. Wait for LLM to generate
4. Recommendations should mention diabetes coverage

### Test Case 3: Different Profiles
1. Create profile A: Age 30, Diabetes
2. Create profile B: Age 60, Hypertension
3. Compare recommendations - should be different

## Troubleshooting

### "Failed to generate recommendations"
- Check your API key is correct
- Verify you have internet connection
- Check browser console for detailed errors
- Ensure Gemini API is enabled in your Google Cloud project

### Recommendations are generic
- Check the LLM prompt in `llmService.js`
- Verify user profile data is being passed correctly
- Try regenerating recommendations

### Profile shows as incomplete
- Check all required fields are filled
- Verify no fields have only whitespace
- Check browser localStorage for saved profile

## Files Modified

1. **`src/utils/llmService.js`** (NEW)
   - LLM API integration
   - Profile validation logic
   - Prompt engineering

2. **`src/pages/Recommendations.jsx`** (UPDATED)
   - Profile completion check
   - LLM recommendation generation
   - Conditional rendering
   - Error handling

## Security Notes

- **Never** hardcode API keys in production
- Use environment variables
- Consider implementing rate limiting
- Add API key rotation
- Monitor API usage and costs

## Cost Considerations

- Gemini API has a free tier
- Each recommendation generation = 1 API call
- Monitor your usage in Google Cloud Console
- Consider caching recommendations for a short time
