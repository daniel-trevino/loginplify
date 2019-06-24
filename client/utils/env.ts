const isBrowser = () => typeof window !== 'undefined'

export const getHostname = (headers: any) => {
  if (process.env.HOSTNAME) {
    return cleanHostname(process.env.HOSTNAME)
  }

  if (isBrowser()) {
    return cleanHostname(window.location.hostname)
  }

  if (headers) {
    return cleanHostname(headers.host)
  }
}

const cleanHostname = (hostname: string) => {
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
