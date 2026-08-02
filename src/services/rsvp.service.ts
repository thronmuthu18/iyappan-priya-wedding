import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'

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
  const isMock = !import.meta.env.VITE_FIREBASE_PROJECT_ID || import.meta.env.VITE_FIREBASE_PROJECT_ID === 'mock-project-id'

  if (isMock) {
    console.log("Firebase not configured. Falling back to local storage buffer.")
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

  // Real Firestore submit
  try {
    const rsvpCollection = collection(db, 'rsvps')
    await addDoc(rsvpCollection, {
      ...data,
      submittedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error("Firestore submission failed. Saving to local storage backup.", error)
    // Fallback save to local storage on network/connection failure
    const offlineRsvps = JSON.parse(localStorage.getItem('offline_rsvps') || '[]')
    offlineRsvps.push({
      ...data,
      submittedAt: new Date().toISOString()
    })
    localStorage.setItem('offline_rsvps', JSON.stringify(offlineRsvps))
    throw error // Re-throw so form shows error notifications
  }
}
