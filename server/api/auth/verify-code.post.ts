import { verificationStore } from "~/server/utils/verification";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const{email, code} = body

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email are required'
        })
    }

    if (!code) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code are required'
        })
    }

    const verification =verificationStore.get(email)

    if (!verification) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Verification not found'
        })
    }

    if (Date.now() > verification.timeOut) {

        verificationStore.delete(email)

        throw createError({
            statusCode: 410,
            statusMessage: 'Verification code expired'
        })
    }

    if (code !== verification.code) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Invalid verification code'
        })
    }

    try {
        await $fetch('/api/users', {
            method: 'POST',
            body: {
                email: email,
                username: verification.username,
                password: verification.password
            }
        })
    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Account dont created'
        })
    }

    const users = await $fetch<{email: string, username: string, password: string, id: string}[]>('/api/users')
    const user = users.find((u: any) => email === u.email)
    
    verificationStore.delete(email)

    return {
        success: true,
        message: 'Account created successfully',
        userLogin: user.id
    }
})