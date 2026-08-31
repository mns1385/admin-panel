import { verificationStore } from "~/server/utils/verification";

export default defineEventHandler(async (event) => {

    const body = await readBody(event)
    const{email, code} = body

    if (!email || !code) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email and code are required'
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
            statusCode: 400,
            statusMessage: 'Invalid verification code'
        })
    }

    

    verificationStore.delete(email)

    return {
        success: true,
        message: 'Account created successfully'
    }
})