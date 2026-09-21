import { useApi } from "~/composables/useApi"

export default defineNuxtRouteMiddleware(async (to, from) => {
    const data = useApi()

    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (isAuthenticated !== 'true') {
        window.location.replace('/auth/login')
        return abortNavigation()
    }

    const userId = localStorage.getItem('userId') || ''

    const user = await <any> data.getUser(userId)

    if (user.role !== 'admin') {
        window.location.replace('/')
        return abortNavigation()
    }
})