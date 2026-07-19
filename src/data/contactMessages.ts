export type ContactMessage = {
  name: string
  organisation: string
  email: string
  role: string
  message: string
  submittedAt: string
}

const CONTACT_MESSAGES_STORAGE_KEY = 'connect-to-care-contact-messages'

export function getContactMessages(): ContactMessage[] {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = window.localStorage.getItem(CONTACT_MESSAGES_STORAGE_KEY)
  if (!stored) {
    return []
  }

  try {
    const parsed = JSON.parse(stored) as ContactMessage[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveContactMessages(messages: ContactMessage[]) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(CONTACT_MESSAGES_STORAGE_KEY, JSON.stringify(messages))
}

export function appendContactMessage(message: ContactMessage) {
  const messages = getContactMessages()
  saveContactMessages([message, ...messages])
}
