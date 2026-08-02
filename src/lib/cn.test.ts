import { describe, it, expect } from 'vitest'
import { cn } from './cn'

describe('cn utility', () => {
  it('should merge classes cleanly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2')
  })

  it('should handle conditional classes', () => {
    const isTrue = Boolean(1)
    const isFalse = Boolean(0)
    expect(cn('class1', isTrue && 'class2', isFalse && 'class3')).toBe('class1 class2')
  })

  it('should resolve tailwind overrides', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4')
  })

  it('should handle undefined and null inputs gracefully', () => {
    expect(cn('class1', undefined, null, 'class2')).toBe('class1 class2')
  })
})
