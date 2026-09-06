export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const {email, password} = body

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email is required'
        })
    }

    if (!password) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Password is required'
        })
    }

    const baseUrl = 'http://localhost:3001/users'
    
    try {
        const users = await $fetch<{email: String, name: string, password: string, role: string, dateCreate: Date, dateLogin: Date, id: string}[]>(baseUrl)
    
        const user = users.find((u: any) => u.email === email)

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User is not exist!'
            })
        }

        if (user.password !== password) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Password is invalid'
            })
        }

        const dateLogin = new Date()

        user.dateLogin = dateLogin

        await $fetch(`${baseUrl}/${user.id}`, {
            method: 'PUT',
            body: user
        })

        return {
            success: true,
            message: 'Login is successfuly',
            userLogin: user.id
        }

    } catch (outerError: any) {
        throw createError({
            statusCode: outerError.statusCode || 500,
            statusMessage: outerError.message || 'Internall server error!'
        })
    }
})