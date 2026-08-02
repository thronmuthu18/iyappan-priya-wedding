import { describe, it, expect } from 'vitest'
import { rsvpSchema } from './rsvp.schema'

describe('RSVP Schema validation rules', () => {
  it('should accept valid attending entries', () => {
    const validData = {
      name: "Eleanor Vance",
      email: "eleanor@example.com",
      attendance: "attending",
      guestsCount: 1,
      guestNames: "John Doe",
      diet: "Vegan",
      message: "Congratulations!"
    }
    const result = rsvpSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject invalid email formats', () => {
    const invalidData = {
      name: "Eleanor Vance",
      email: "invalid-email-string",
      attendance: "attending",
      guestsCount: 0
    }
    const result = rsvpSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should reject guest counts exceeding the max limit', () => {
    const invalidData = {
      name: "Eleanor Vance",
      email: "eleanor@example.com",
      attendance: "attending",
      guestsCount: 10 // exceeds maximum limit of 5
    }
    const result = rsvpSchema.safeParse(invalidData)
    expect(result.success).toBe(false)
  })

  it('should accept minimal declined entries', () => {
    const validData = {
      name: "Eleanor Vance",
      email: "eleanor@example.com",
      attendance: "declined",
      guestsCount: 0
    }
    const result = rsvpSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })
})
