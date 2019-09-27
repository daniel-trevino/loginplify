import cookie from 'cookie'
import CookieJs from 'js-cookie'

export const createTokenCookie = (token: string) => {
  document.cookie = cookie.serialize('loginplify-token', token, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: '/'
  })
}

export const removeCookie = (cookieName: string) => {
  CookieJs.remove(cookieName)
}
