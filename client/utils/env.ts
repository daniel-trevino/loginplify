const isBrowser = () => typeof window !== 'undefined'

export const getHostname = (headers: any) => {
  if (process.env.HOSTNAME) {
    return cleanHostname(process.env.HOSTNAME)
  }

  if (isBrowser()) {
    const host = window.location.host || null
    return host && cleanHostname(host)
  }

  if (headers) {
    return headers.host
  }
}

export const cleanHostname = (hostname: string) => {
  if (!hostname) return
  hostname = hostname.match(/:/) ? hostname.split(':')[0] : hostname

  const parts = hostname.split('.')

  if (parts.length >= 3) {
    hostname = hostname
      .split('.')
      .splice(parts.length - 2)
      .join('.')
  }

  return hostname
}
