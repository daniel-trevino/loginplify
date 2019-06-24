import { cleanHostname } from '../utils/env'

describe('Env utils', () => {
  it('should clean hostname', () => {
    const mockHostname = 'localhost:3000'
    const result = cleanHostname(mockHostname)

    expect(result).toBe('localhost')
  })
})
