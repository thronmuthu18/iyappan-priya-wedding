import { create } from 'zustand'

export interface UIState {
  isLoaderVisible: boolean
  musicEnabled: boolean | null
  setLoaderVisible: (visible: boolean) => void
  setMusicEnabled: (enabled: boolean) => void
}

export const useUIStore = create<UIState>()((set) => ({
  isLoaderVisible: true,
  musicEnabled: null,
  setLoaderVisible: (visible) => set({ isLoaderVisible: visible }),
  setMusicEnabled: (enabled) => set({ musicEnabled: enabled }),
}))
