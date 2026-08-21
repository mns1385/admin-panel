import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)

    const login = () => {
        isAuthenticated.value = true
        localStorage.setItem('Authenticated', 'true')
    }

    const logout = () => {
        isAuthenticated.value = false
        localStorage.setItem('Authenticated', 'false')
    }

    return {
        isAuthenticated,
        login,
        logout
    }
})