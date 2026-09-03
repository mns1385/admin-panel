import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {

    const login = (userLogin: string) => {
        localStorage.setItem('userId', userLogin)
    }

    const logout = () => {
        localStorage.clear()
        window.location.reload()
    }

    const emailCheck = ref('')
    const sendCode = ref(false)

    const sendingCode = (email: string) => {
        emailCheck.value = email,
        sendCode.value = true
    }

    return {
        login,
        logout,
        emailCheck,
        sendCode,
        sendingCode,
    }
})