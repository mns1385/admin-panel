import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendVerificationCode( email: string, code: string ) {
    const { data, error} = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Verify code',
        html: `
        <div>
            <h2>Your verify code for admin-panel</h2>

            <h1>${code}</h1>
        </div>`
    })

    if (error) {
        throw new Error(error.message)
    }

    return data
}