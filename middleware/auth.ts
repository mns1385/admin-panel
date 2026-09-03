export default defineNuxtRouteMiddleware(() => {
    if (import.meta.client) {

        let userId = localStorage.getItem('userId')

        if (!userId) {
            window.location.replace('/auth/login')
            return abortNavigation()
        }
    }
})