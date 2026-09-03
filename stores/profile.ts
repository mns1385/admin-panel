import { defineStore } from "pinia"

export const useProfileStore = defineStore('auth', () => {
    const user = ref({})

    const onLoad = async () => {
        const userId = localStorage.getItem('userId')

        user.value = await $fetch('/api/users', {method: 'GET', query: {input: userId}})
    }

    return {
        onLoad,
        user
    }
})