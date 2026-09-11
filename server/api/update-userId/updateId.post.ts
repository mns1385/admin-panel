import { readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const {userId, newId} = body

    if (!userId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'User ID is required!'
        })
    }

    if (!newId) {
        throw createError({
            statusCode: 400,
            statusMessage: 'New ID is required!'
        })
    }

    const baseUrl = 'http://localhost:3001/users'

    try {
        const users = await $fetch<any>(baseUrl, {method: 'GET'})
        const existUser = users.find((u: any) => u.id === newId)

        if (existUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'This ID is already in use!'
            })
        }

        const user = users.find((u: any) => u.id === userId)

        if (!user) {
            throw createError({
                statusCode: 404,
                statusMessage: 'User not found!'
            })
        }

        user.id = newId

        await $fetch(`${baseUrl}/${userId}`, {
            method: 'PUT',
            body: user
        })

        return {
            success: true,
            message: 'Your ID updated!'
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Failed to verify code'
        })
    }
})