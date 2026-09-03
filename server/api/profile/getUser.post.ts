export default defineEventHandler(async (event) => {
    const body = readBody(event)
    const userId = body

    if (!userId) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Id is required'
        })
    }

    const users = await $fetch<{email: string, username: string, password: string, id: string}[]>('/api/users')
    

    if (!users) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Users is required'
        })
    }

    const user = users.find((user: any) => user.id === userId)

    return {
        user
    }
})