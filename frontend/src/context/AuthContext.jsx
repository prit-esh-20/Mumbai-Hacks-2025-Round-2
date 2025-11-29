import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Check for existing user in localStorage
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser))
            } catch (e) {
                console.error('Error parsing stored user:', e)
            }
        }
        setIsLoading(false)
    }, [])

    const login = (email, password) => {
        // Mock login - in real app, this would call an API
        if (email && password) {
            // Try to preserve the exact name used during signup for this email
            let existingName = null
            const storedUser = localStorage.getItem('user')

            if (storedUser) {
                try {
                    const parsed = JSON.parse(storedUser)
                    if (parsed.email === email && parsed.name) {
                        existingName = parsed.name
                    }
                } catch (e) {
                    console.error('Error parsing stored user:', e)
                }
            }

            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                // If we've seen this email before, keep that exact name.
                // Otherwise fall back to a simple default based on email.
                name: existingName || email.split('@')[0],
                isLoggedIn: true
            }
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            return { success: true, user: newUser }
        }
        return { success: false, message: 'Invalid credentials' }
    }

    const signup = (name, email, password) => {
        // Mock signup
        if (name && email && password) {
            const newUser = {
                id: Math.random().toString(36).substr(2, 9),
                name,
                email,
                isLoggedIn: true
            }
            setUser(newUser)
            localStorage.setItem('user', JSON.stringify(newUser))
            return { success: true, user: newUser }
        }
        return { success: false, message: 'Please fill all fields' }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const value = {
        user,
        isLoading,
        login,
        signup,
        logout
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
