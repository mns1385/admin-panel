import { randomInt } from 'node:crypto'
import { verificationStore } from '~/server/utils/verification'
import { sendVerificationCode } from '~/server/utils/mail'

export default defineEventHandler(async (event) => {

    //دریافت ایمیل
    const body = await readBody(event)
    const{ email, username, password } = body

    //برسی ایمیل
    if (!email) {
        throw createError ({
            statusCode: 400,
            statusMessage: 'Email is required'
        })
    }

    //ساخت کد 5 رقمی
    const code = randomInt(10000, 100000)

    //زمان انقضا: 5 دقیقه
    const timeOut = Date.now() + 5 * 60 * 1000

    //ذخیره اطلاعات session
    verificationStore.set(email, {
        username,
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
})