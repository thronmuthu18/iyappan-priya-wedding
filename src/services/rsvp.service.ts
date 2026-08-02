// Mock RSVP Service

export interface RSVPData {
  name: string
  email: string
  attendance: 'attending' | 'declined'
  guestsCount: number
  guestNames?: string
  diet?: string
  message?: string
}

export async function submitRSVP(data: RSVPData): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentRsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]')
      currentRsvps.push({
        ...data,
        submittedAt: new Date().toISOString(),
      })
      localStorage.setItem('wedding_rsvps', JSON.stringify(currentRsvps))
      resolve()
    }, 1200)
  })
}
