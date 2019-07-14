const isBrowser = () => typeof window !== 'undefined'

export const getHostname = (req: any) => {
  if (process.env.HOSTNAME) {
    return cleanHostname(process.env.HOSTNAME)
  }

  if (isBrowser()) {
    const host = window.location.host || null
    return host && cleanHostname(host)
  }

  if (req) {
    if (!req.headers) {
      throw new Error('Headers missing from `req`')
    }

    return cleanHostname(req.headers.host)
  }

  throw new Error('Missing param `req`')
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

export const getEndpoint = (hostname: string) => {
  if (hostname === 'localhost') {
    return `https://${hostname}:3000/graphql`
  }

  return `https://loginservice.${hostname}/graphql`
}
