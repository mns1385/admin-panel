import { randomInt } from "node:crypto"
import { readBody, createError } from 'h3'
import { emailChangeStore } from '~/server/utils/email-change'
import { sendVerificationCode } from "~/server/utils/mail"

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {userId, newEmail} = body

    if (!userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User ID is required'
        })
    }

    if (!newEmail) {
        throw createError({
            statusCode: 400,
            statusMessage: 'New Email is required'
        })
    }

    const baseUrl = 'http://localhost:3001/users'
    try {
        const users = await $fetch<any>(baseUrl)
        const existUser = users.find((u: any) => u.email === newEmail)

        if (existUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'This email is already in use'
            })
        }

        const code = randomInt(10000, 100000).toString()
        const timeOut = Date.now() + 5 * 60 * 1000

        emailChangeStore.set(userId, {
            userId,
            newEmail,
            code,
            timeOut
        })

        await sendVerificationCode(newEmail, code)        

        return {
            success: true,
            message: 'Verification code sent'
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to send verification code'
        })
    }
})