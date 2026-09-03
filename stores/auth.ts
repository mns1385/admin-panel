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

    const user = ref({email: '', username: '', password: '', id: ''})
    const onLoad = async () => {
        const userId = localStorage.getItem('userId')
        user.value = await $fetch('/api/users', {method: 'GET', query: {input: userId}})
    }

    return {
        login,
        logout,
        emailCheck,
        sendCode,
        sendingCode,
        user,
        onLoad
    }
})