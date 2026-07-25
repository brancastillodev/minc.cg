import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

window.scrollTo = vi.fn()

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  configurable: true,
  value: 1024,
})

Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: vi.fn(),
})

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: vi.fn(),
})
