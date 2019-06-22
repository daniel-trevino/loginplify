import * as nodemailer from 'nodemailer'
import { EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD } from './constants'

export async function sendConfirmationEmail(
  host: string,
  id: string,
  email: string
) {
  const transporter = nodemailer.createTransport({
    auth: {
      pass: EMAIL_PASSWORD,
      user: EMAIL_USER
    },
    host: EMAIL_HOST,
    port: 465,
    secure: true
  })

  const LINK = `http://${host}/verify/${id}`

  const mailOptions = {
    from: 'no-reply@danieltrevino.se',
    subject: `Login service verification`,
    text: `
      Visit this link to verify your account: ${LINK}
    `,
    to: email
  }

  try {
    const response = await transporter.sendMail(mailOptions)
    // tslint:disable-next-line:no-console
    console.log('EMAIL RESPONSE', response)
  } catch (e) {
    // tslint:disable-next-line:no-console
    console.log('Error', e)
  }

  return true
}
