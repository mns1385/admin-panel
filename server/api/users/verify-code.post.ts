import { readBody, createError } from 'h3'
import { userCreateStore } from '~/server/utils/user-create'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {email, code} = body

    if (!email) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Email is required!'
        })
    }

    if (!code) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Code is required!'
        })
    }

    const dateCreate = new Date()

    const baseUrl = 'http://localhost:3001/users'

    try {
        const session = userCreateStore.get(email)

        if (!session) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No pending request found!'
            })
        }

        if (session.code !== code) {
            throw createError({
                statusCode: 410,
                statusMessage: 'Invalid verification code!'
            })
        }

        await $fetch(baseUrl, {
            method: 'POST',
            body: {
                email: session.email,
                name: session.name,
                password: session.password,
                role: session.role,
                dateCreate: dateCreate,
                dateLogin: 'Not Login'
            }
        })

        userCreateStore.delete(email)

        return {
            success: true,
            message: 'New User be created!'
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to create user!'
        })
    }
})