import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)

    const login = (userLogin: any) => {
        isAuthenticated.value = true
        localStorage.setItem('userId', userLogin)
        localStorage.setItem('isAuthenticated', 'true')
    }

    const logout = () => {
        isAuthenticated.value = false
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('userId')
        window.location.href = '/auth/login'
    }

    const emailCheck = ref('')
    const sendCode = ref(false)

    const sendingCode = (email: string) => {
        emailCheck.value = email,
        sendCode.value = true
    }

    return {
        isAuthenticated,
        login,
        logout,
        emailCheck,
        sendCode,
        sendingCode
    }
})