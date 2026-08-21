export default defineNuxtRouteMiddleware(() => {
    if (import.meta.client) {

        let isAuthenticated = localStorage.getItem('isAuthenticated')

        if (isAuthenticated !== 'true') {
            window.location.replace('/auth/login')
            return abortNavigation()
        }
    }
})