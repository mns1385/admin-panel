import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)

    const login = (userLogin: string) => {
        isAuthenticated.value = true
        localStorage.setItem('userId', userLogin)
    }

    const logout = () => {
        isAuthenticated.value = false
        localStorage.clear()
        window.location.reload()
    }

    const emailCheck = ref('')
    const sendCode = ref(false)

    const sendingCode = (email: string) => {
        emailCheck.value = email,
        sendCode.value = true
    }

    const userId = localStorage.getItem('user')
    const user = ref($fetch('/api/users', {method: 'GET', query: {input: userId}}))
    return {
        isAuthenticated,
        login,
        logout,
        emailCheck,
        sendCode,
        sendingCode,
        user
    }
})