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

    const userId = ref()
    const user = ref({})
    const onLoad = async () => {
        userId.value = localStorage.getItem('userId')
        user.value = await $fetch('/api/users', {method: 'GET', query: userId})
    }

    return {
        isAuthenticated,
        login,
        logout,
        emailCheck,
        sendCode,
        sendingCode,
        user,
        onLoad
    }
})