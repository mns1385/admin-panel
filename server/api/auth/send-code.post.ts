import { randomBytes, randomInt, createHash } from 'node:crypto'
import { verificationStore } from '~/server/utils/verification'

export default defineEventHandler(async (event) => {

    //دریافت ایمیل
    const body = await readBody(event)
    const{ email } = body

    //برسی ایمیل
    if (!email) {
        throw createError ({
            statusCode: 400,
            statusMessage: 'Email is required'
        })
    }

    //ساخت Session ID
    const sessionId = randomBytes(32).toString('hex')

    //ساخت کد 5 رقمی
    const code = randomInt(10000, 10000).toString()

    //هش کردن کد
    const codeHash = createHash('sha256').update(code).digest('hex')

    //زمان انقضا: 5 دقیقه
    const expiresAt = Date.now() + 5 * 60 * 1000

    //ذخیره اطلاعات session
    verificationStore.set(sessionId, {
        email,
        codeHash,
        expiresAt
    })

    return {
        success: true,
        sessionId
    }
})