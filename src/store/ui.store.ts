import { create } from 'zustand'

export interface UIState {
  isLoaderVisible: boolean
  musicEnabled: boolean | null
  language: 'ta' | 'en'
  setLoaderVisible: (visible: boolean) => void
  setMusicEnabled: (enabled: boolean) => void
  setLanguage: (lang: 'ta' | 'en') => void
}

const getInitialLanguage = (): 'ta' | 'en' => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('wedding_lang')
    if (saved === 'ta' || saved === 'en') return saved
  }
  return 'en'
}

export const useUIStore = create<UIState>()((set) => ({
  isLoaderVisible: true,
  musicEnabled: null,
  language: getInitialLanguage(),
  setLoaderVisible: (visible) => set({ isLoaderVisible: visible }),
  setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
  setLanguage: (lang) => {
    localStorage.setItem('wedding_lang', lang)
    set({ language: lang })
  },
}))
