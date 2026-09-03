export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    
    const users = await $fetch<{}[]>('http://localhost:3001/users')

    if (body === 'all') {
        return users
    } else {
        const user = users.find((user: any) => user.id === body)
        return user
    }
})