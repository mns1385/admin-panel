export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const userId = body.userId

    if (!userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Id is required'
        })
    }

    const users = await $fetch<{email: string, username: string, password: string, id: string}[]>('/api/users')
    

    if (!users || users.length === 0) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Users list is empty or unavailable'
        })
    }

    const user = users.find((u: any) => u.id === userId)

    if (!user) {
        throw createError({
            statusCode: 404,
            statusMessage: 'User not found'
        })
    }

    return {
        user
    }
})