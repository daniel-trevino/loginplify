import * as nodemailer from 'nodemailer'
// import mongoose from '../lib/database'
import { randomBytes } from 'crypto'
import { promisify } from 'util'
import {
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASSWORD,
  EMAIL_SENDER
} from './constants'
import { AuthenticationError } from 'apollo-server-core'

export async function sendConfirmationEmail(
  host: string,
  token: string,
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

  const LINK = `http://${host}/verify?token=${token}`

  const mailOptions = {
    from: EMAIL_SENDER,
    subject: `Login service verification`,
    text: `
      Visit this link to verify your account: ${LINK}
    `,
    to: email
  }

  try {
    await transporter.sendMail(mailOptions)
    return true
  } catch (e) {
    throw new Error(e)
  }
}

export const isStillValidTokenExpiry = (verifyTokenExpiry: any) => {
  const oneHourAgo = Date.now() - 3600000
  return verifyTokenExpiry > oneHourAgo
}

export const createRandomToken = async () => {
  const randomBytesPromise = promisify(randomBytes)
  const randomToken = (await randomBytesPromise(20)).toString('hex')
  const randomTokenExpiry = Date.now() + 3600000 // 1 hour from now

  return { randomToken, randomTokenExpiry }
}

export async function isAlreadyRegistered(ctx: any, email: string) {
  try {
    const user = await ctx.models.User.findOne({ email })
    if (user) {
      throw new AuthenticationError('User already registered')
    }

    return true
  } catch (e) {
    throw new Error(e)
  }
}

export function verifyAdmin(permissions: Array<any>): boolean {
  return Boolean(permissions.find(permission => permission.enum === 'ADMIN'))
}
