export default defineNuxtRouteMiddleware(() => {
    if (import.meta.client) {
        const isAuthenticated = localStorage.getItem('isAuthenticated')

        if (isAuthenticated !== 'true') {
            return navigateTo('/auth/login')
        }
    }
})