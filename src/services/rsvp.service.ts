export interface RSVPData {
  name: string
  phone: string
  attendance: 'attending' | 'declined'
  guestsCount?: number
  guestNames?: string
  message?: string
}

export const WHATSAPP_PHONE_NUMBER = '917502902121'

export function generateWhatsAppRSVPMessage(data: RSVPData): string {
  const isAttending = data.attendance === 'attending'
  const attendanceText = isAttending ? 'Yes' : 'No'
  
  let guestsText = '0'
  if (isAttending) {
    const totalCount = (data.guestsCount || 0) + 1
    if (data.guestNames && data.guestNames.trim()) {
      guestsText = `${totalCount} (${data.guestNames.trim()})`
    } else {
      guestsText = `${totalCount}`
    }
  }

  const messageText = data.message && data.message.trim() ? data.message.trim() : 'None'

  return `💍 New Wedding RSVP

👤 Name:
${data.name}

📱 Phone:
${data.phone}

👥 Number of Guests:
${guestsText}

✅ Will Attend:
${attendanceText}

💬 Message:
${messageText}`
}

export function submitRSVP(data: RSVPData): void {
  const text = generateWhatsAppRSVPMessage(data)
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`
  
  if (typeof window !== 'undefined') {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }
}
