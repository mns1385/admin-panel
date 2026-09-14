import { randomInt } from "crypto"
import { readBody, createError } from "h3"
import { userCreateStore } from "~/server/utils/user-create"
import { sendVerificationCode } from "~/server/utils/mail"

export default defineEventHandler( async (event) => {
    const body = await readBody(event)
    const {email, name, password, role} = body

    if (!email || !name || !password || !role) {
        throw createError({
            statusCode: 400,
            statusMessage: 'email, name, password and role are required!'
        })
    }

    const baseUrl = 'http://localhost:3001/users'
    try {
        const users = await $fetch<any>(baseUrl)
        const existUser = users.find((u: any) => u.email === email)

        if (existUser) {
            throw createError({
                statusCode: 409,
                statusMessage: 'This email is already in use!'
            })
        }

        const code = randomInt(100000, 1000000).toString()
        const timeOut = Date.now() + 5 * 60 * 1000

        userCreateStore.set(email, {
            email,
            name,
            password,
            role,
            code,
            timeOut
        })

        await sendVerificationCode(email, code)

        return {
            success: true
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusCode || 'Failed to send code!'
        })
    }
})