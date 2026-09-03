import { defineStore } from "pinia";

export const useProfileStore = defineStore('auth', () => {
    const user = ref()

    onMounted(async () => {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Id is required'
            })
        }

        try {
            const response = await $fetch('/api/profile/getUser', {
                method: 'POST',
                body: {
                    userId: userId
                }
            })

            user.value = response.user
        } catch (error) {
            throw error
        }
    })

    return {
        user
    }
})