export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    
    const users = await $fetch<{}[]>('http://localhost:3001/users')

    if (query.input === 'all') {
        return users
    } else {
        const user = users.find((user: any) => user.id === query.input)
        return user
    }
})