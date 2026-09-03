export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const {email, password} = body

    if (!email) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Email is required'
        })
    }

    if (!password) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Password is required'
        })
    }

    const users = await $fetch<{email: string, username: string, password: string, id: string}[]>('/api/users', { method: 'GET', query: {input: 'all'}})

    const user = users.find((user: any) => email === user.email)

    if (!user) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User is not found'
        })
    }

    if (user.password !== password) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid password'
        })
    }

    return {
        success: true,
        message: 'Login successful',
        userLogin: user.id
    }
})