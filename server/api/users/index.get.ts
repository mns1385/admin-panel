export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    if (query.input === 'all') {
        return await $fetch('/localhost:3001/users')
    } else {
        return await $fetch(`/localhost:3001/users/${query.input}`)
    }
})