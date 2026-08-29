import { createHash } from "node:crypto";
import { verificationStore } from "~/server/utils/verification";

export default defineEventHandler(async (event) => {

    //دریافت اطلاعات درخواست
    const body = await readBody(event)
    const { sessionId, code } = body
    
    //برسی اطلاعات ورودی
    if (!sessionId || !code) {
        throw createError({
            status: 400,
            statusMessage: 'Session ID and code are required'
        })
    }

    //پیدا کردن session
    const session = verificationStore.get(sessionId)

    if (!session) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Verification session not found'
        })
    }

    //برسی زمان انقضا
    if (Date.now() > session.expiresAt) {
        verificationStore.delete(sessionId)

        throw createError({
            statusCode: 410,
            statusMessage: 'Verificaion code expired'
        })
    }

    //برسی تعداد تلاش
    if (session.attempts >= 5) {
        verificationStore.delete(sessionId)

        throw createError({
            statusCode: 429,
            statusMessage: 'Too many attempts'
        })
    }

    //افزایش تعداد تلاش
    session.attempts++

    //Hash کردن کد وارد شده
    const codeHash = createHash('sha256').update(code).digest('hex')

    //برسی صحیح بودن کد
    if (codeHash !== session.codeHash) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Invalid verification code'
        })
    }

    //تایید موفق
    verificationStore.delete(sessionId)

    return {
        success: true,
        message: 'Email verified successfully'
    }
})