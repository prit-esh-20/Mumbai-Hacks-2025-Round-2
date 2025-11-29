// Format currency
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount)
}

// Generate ID
export const generateId = () => {
    return Math.random().toString(36).substr(2, 9)
}

// Show Toast Notification
export const showToast = (message, type = 'info') => {
    const toast = document.createElement('div')
    toast.className = `toast toast-${type} glass-card slide-up`
    toast.style.position = 'fixed'
    toast.style.bottom = '20px'
    toast.style.right = '20px'
    toast.style.padding = '1rem 2rem'
    toast.style.zIndex = '9999'
    toast.style.background = type === 'error' ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 255, 0, 0.2)'
    toast.style.border = type === 'error' ? '1px solid rgba(255, 0, 0, 0.3)' : '1px solid rgba(0, 255, 0, 0.3)'
    toast.innerText = message

    document.body.appendChild(toast)

    setTimeout(() => {
        toast.remove()
    }, 3000)
}

// LocalStorage wrapper
export const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key)
            return item ? JSON.parse(item) : null
        } catch (e) {
            console.error('Error getting from storage', e)
            return null
        }
    },
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            console.error('Error setting to storage', e)
        }
    },
    remove: (key) => {
        localStorage.removeItem(key)
    }
}
