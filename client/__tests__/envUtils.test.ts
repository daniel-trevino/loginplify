import { cleanHostname } from '../utils/env'

describe('Env utils', () => {
  it('should clean hostname', () => {
    const mockHostname = 'loginservice.danieltrevino.se'
    const result = cleanHostname(mockHostname)

    expect(result).toBe('loginservice.danieltrevino.se')
  })
})
