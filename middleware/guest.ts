export default defineNuxtRouteMiddleware(() => {
    if (import.meta.client) {
        const userId = localStorage.getItem('userId')

        if (userId) {
            window.location.replace('/')
            return abortNavigation()
        }
    }
})