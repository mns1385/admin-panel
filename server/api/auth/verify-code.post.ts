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

    const verification = verificationStore.get(email)

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

    const baseUrl = 'http://localhost/users'
    const dateCreate = Date.now()

    try {
        const newUser = await $fetch<{id: string}>(baseUrl, {
            method: 'POST',
            body: {
                email: email,
                name: verification.name,
                password: verification.password,
                role: 'user',
                dateCreate: dateCreate,
                dateLogin: dateCreate
            }
        })

        return {
            success: true,
            message: 'Account created!',
            userLogin: newUser.id
        }

    } catch (error) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Account dont created'
        })
    }
})