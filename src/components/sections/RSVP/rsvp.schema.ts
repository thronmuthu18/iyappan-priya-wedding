import { z } from 'zod'

export const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number"),
  attendance: z.enum(['attending', 'declined'], {
    message: "Please select your attendance status",
  }),
  guestsCount: z.number().min(0).max(10),
  guestNames: z.string().optional(),
  message: z.string().optional(),
})

export type RSVPFormData = z.infer<typeof rsvpSchema>
