import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)

    const login = (userLogin: any) => {
        isAuthenticated.value = true
        localStorage.setItem('user', userLogin)
        localStorage.setItem('isAuthenticated', 'true')
    }

    const logout = () => {
        isAuthenticated.value = false
        localStorage.removeItem('isAuthenticated')
        localStorage.removeItem('user')
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