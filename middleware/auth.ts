export default defineNuxtRouteMiddleware(() => {
    if (!import.meta.client) {
        return
    }

    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (isAuthenticated !== 'true') {
        window.location.replace('/auth/login')
        return abortNavigation()
    } else if (isAuthenticated === 'true') {
        window.location.replace('/')
        return abortNavigation()
    }
})