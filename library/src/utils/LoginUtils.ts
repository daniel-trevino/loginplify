import cookie from 'cookie'

export const createTokenCookie = (token: string) => {
  document.cookie = cookie.serialize('token', token, {
    maxAge: 30 * 24 * 60 * 60 // 30 days
  })
}

export const removeCookie = (cookieName: string) => {
  document.cookie = `${cookieName}=; Max-Age=0`
}
