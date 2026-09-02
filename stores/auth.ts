import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(false)
    let user

    const login = (userLogin: any) => {
        user = userLogin 
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
        sendingCode,
        user
    }
})