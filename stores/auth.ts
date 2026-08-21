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
    }

    return {
        isAuthenticated,
        login,
        logout
    }
})