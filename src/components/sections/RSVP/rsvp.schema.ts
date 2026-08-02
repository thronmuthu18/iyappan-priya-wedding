import { z } from 'zod'

export const rsvpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  attendance: z.enum(['attending', 'declined'], {
    message: 'Please select your attendance status',
  }),
  guestsCount: z.number().min(0).max(5),
  guestNames: z.string().optional(),
  diet: z.string().optional(),
  message: z.string().optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>
