import { randomInt } from 'node:crypto'
import { verificationStore } from '~/server/utils/verification'
import { sendVerificationCode } from '~/server/utils/mail'

export default defineEventHandler(async (event) => {

    //دریافت ایمیل
    const body = await readBody(event)
    const{ email, name, password } = body

    //برسی ایمیل
    if (!email) {
        throw createError ({
            statusCode: 400,
            statusMessage: 'Email is required'
        })
    }

    if (!name) {
        throw createError ({
            statusCode: 400,
            statusMessage: 'User name is required'
        })
    }

    if (!password) {
        throw createError ({
            statusCode: 400,
            statusMessage: 'Password is required'
        })
    }

    //ساخت کد 5 رقمی
    const code = randomInt(10000, 100000).toString()

    //زمان انقضا: 5 دقیقه
    const timeOut = Date.now() + 5 * 60 * 1000

    const baseUrl = 'http://localhost/users'

    try {
        const users = await $fetch<{email: string}[]>(baseUrl)
        const user = users.find((u: any) => u.email === email)

        if (user) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Email is repetitive!'
            })
        }

        //ذخیره اطلاعات session
        verificationStore.set(email, {
            name,
            password,
            code,
            timeOut
        })

        try {
            await sendVerificationCode(email, code)
        } catch (error) {
            throw createError({
                statusCode: 500,
                statusMessage: 'Failed to send verification email'
            })
        }

        return {
            success: true
        }
    } catch (error: any) {
        throw createError({
            statusCode: 500,
            statusMessage: error.message || 'Failed to get data!'
        })
    }
})