import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)

    const login = () => {
        isAuthenticated.value = true
        localStorage.setItem('isAuthenticated', 'true')
    }

    const logout = () => {
        isAuthenticated.value = false
        localStorage.setItem('isAuthenticated', 'false')
        window.location.reload()
    }

    const emailCheck = ref('')
    const sendCode = ref(false)

    return {
        isAuthenticated,
        login,
        logout,
        emailCheck,
        sendCode
    }
})