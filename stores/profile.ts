import { defineStore } from "pinia";

export const useProfileStore = defineStore('profile', () => {
    const user = ref<any>(null)

    const onLoad = async () => {
        const userId = await localStorage.getItem('userId')

        if (!userId) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Id is required'
            })
        }

        try {
            const response = await $fetch('/api/profile/getUser', {
                method: 'POST',
                body: {userId}
            })

            user.value = response.user
        } catch (error) {
            console.error('Faild to fetch user profile:', error)
            localStorage.removeItem('userId')
            localStorage.removeItem('isAuthenticated')
        }
    }

     const clearUser = () => {
        user.value
    }

    return {
        user,
        onLoad,
        clearUser
    }
})