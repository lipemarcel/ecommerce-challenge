import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

global.fetch = jest.fn()

// Limpa todos os mocks após cada teste
afterEach(() => {
  jest.clearAllMocks()
})