import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";

export const useProfileStore = defineStore('profile', () => {
    const user = ref<any>(null)

    const onLoad = async () => {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Id is required'
            })
        }

        const data = useApi()

        try {
            const userLoad = await data.getUser(userId)

            user.value = userLoad
        } catch (error) {
            console.error('Faild to fetch user profile:', error)
            localStorage.removeItem('userId')
            localStorage.removeItem('isAuthenticated')
        }
    }

    return {
        user,
        onLoad
    }
})