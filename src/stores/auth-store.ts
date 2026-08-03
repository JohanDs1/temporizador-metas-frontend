import { create } from 'zustand'
import Cookies from 'js-cookie'
import type {User} from '@/lib/user'



interface AuthState {
  user: User | null
  isLoggedIn: boolean
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: (() => {
    const storedUser = Cookies.get('user')

    if (!storedUser) {
      return null
    }

    try {
      return JSON.parse(storedUser)
    } catch {
      Cookies.remove('user')
      return null
    }
  })(),

  isLoggedIn: !!Cookies.get('user'),

  login: (user) => {
    Cookies.set('user', JSON.stringify(user), {
      expires: 7,
    })

    set({
      user,
      isLoggedIn: true,
    })
  },

  logout: () => {
    Cookies.remove('user')

    set({
      user: null,
      isLoggedIn: false,
    })
  },
}))