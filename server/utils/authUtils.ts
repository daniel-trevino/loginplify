import * as nodemailer from 'nodemailer'
import { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD } from './constants'

export async function sendConfirmationEmail(
  host: string,
  id: string,
  email: string
) {
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASSWORD
    }
  })

  const LINK = `http://${host}/verify/${id}`

  const mailOptions = {
    from: 'no-reply@danieltrevino.se',
    to: email,
    subject: `Login service verification`,
    text: `
      Visit this link to verify your account: ${LINK}
    `
  }

  try {
    await transporter.sendMail(mailOptions)
  } catch (e) {
    console.log('Error', e)
  }

  return true
}
