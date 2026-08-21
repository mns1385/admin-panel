export default defineNuxtRouteMiddleware(() => {
    if (!import.meta.client) {
        return
    }

    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (isAuthenticated !== 'true') {
        return navigateTo('/auth/login')
    } else {
        return navigateTo('/')
    }
})