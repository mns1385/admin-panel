import { emailChangeStore } from '~/server/utils/email-change'
import { readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {userId, code} = body

    if (!userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User Id is required!'
        })
    }

    if (!code) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code is required!'
        })
    }

    const baseUrl = 'http://localhost:3001/users'
    try {
        const session = emailChangeStore.get(userId)

        if (!session) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No pending email change request found!'
            })
        }

        if (session.timeOut < Date.now()) {
            emailChangeStore.delete(userId)

            throw createError({
                statusCode: 410,
                statusMessage: 'Verification code expired!'
            })
        }

        if (session.code !== code) {
            throw createError({
                statusCode: 409,
                statusMessage: 'Invalid verification code!'
            })
        }

        const users = await $fetch<any>(baseUrl)
        const user = users.find((u: any) => u.id === userId)

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found!'
            })
        }

        user.email = session.newEmail

        await $fetch(`${baseUrl}/${userId}`, {
            method: 'PUT',
            body: user
        })

        emailChangeStore.delete(userId)

        return {
            success: true,
            message: 'Email change successfully'
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to verify code'
        })
    }
})