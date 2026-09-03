import { defineStore } from "pinia"

export const useProfileStore = defineStore('auth', () => {
    const user = ref()

    onMounted(async () => {
        const userId = localStorage.getItem('userId')
        const users = await $fetch<{email: string, username: string, password: string, id: string}[]>('/api/users')

        user.value = users.find((user: any) => user.id === userId)
    })

    return {
        user
    }
})