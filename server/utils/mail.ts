import nodemailer from 'nodemailer'

export async function sendVerificationCode(email: string, code: string) {
  // ساخت transporter با Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,           // ایمیل شما
      pass: process.env.GMAIL_APP_PASSWORD    // App Password (نه رمز اصلی!)
    }
  })

  // ارسال ایمیل
  const info = await transporter.sendMail({
    from: `"Admin Panel" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Your Verification Code',
    html: 
      `<div style="font-family: Arial, sans-serif; text-align: center; padding: 40px; background-color: #f9fafb;">
        <div style="max-width: 500px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #1f2937; margin-bottom: 20px;">Your Verification Code</h2>
          <h1 style="color: #4F46E5; font-size: 35px; letter-spacing: 8px; margin: 30px 0;">${code}</h1>
          <p style="color: #6b7280; font-size: 14px;">This code expires in 5 minutes.</p>
          <p style="color: #9ca3af; font-size: 12px; margin-top: 30px;">If you didn't request this code, please ignore this email.</p>
        </div>
      </div>`
    
  })

  console.log('Email sent:', info.messageId)
  return info
}