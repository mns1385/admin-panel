import { defineStore } from "pinia";

export const useProfileStore = defineStore('auth', () => {
    const user = ref()

    const onLoad = async () => {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Id is required'
            })
        }

    
            const response = await $fetch('/api/profile/getUser', {
                method: 'POST',
                body: userId
            })

            user.value = response.user
    }

    return {
        user,
        onLoad
    }
})