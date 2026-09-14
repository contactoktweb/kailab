export type UserSession = {
  email: string
  name: string
  role: 'Súper Administrador' | 'Investigador'
  token: string
  loggedInAt: string
}

const STORAGE_KEY = 'kailab_auth_session'

export class AuthService {
  private static defaultAdminUser: UserSession = {
    email: 'admin@kailab.co',
    name: 'Administrador KAILAB',
    role: 'Súper Administrador',
    token: 'kailab_tok_secure_883192',
    loggedInAt: new Date().toISOString(),
  }

  static login(email: string, pass: string): { success: boolean; user?: UserSession; error?: string } {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPass = pass.trim()

    if (!cleanEmail || !cleanPass) {
      return { success: false, error: 'Por favor ingresa tu correo y contraseña.' }
    }

    // Acepta credenciales de admin o cualquier correo válido con contraseña >= 4 caracteres
    if ((cleanEmail === 'admin@kailab.co' && cleanPass === 'admin123') || (cleanEmail.includes('@') && cleanPass.length >= 4)) {
      const user: UserSession = {
        email: cleanEmail,
        name: cleanEmail === 'admin@kailab.co' ? 'Administrador KAILAB' : cleanEmail.split('@')[0].toUpperCase(),
        role: 'Súper Administrador',
        token: `kailab_tok_${Date.now()}`,
        loggedInAt: new Date().toISOString(),
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      }
      return { success: true, user }
    }

    return { success: false, error: 'Credenciales inválidas. Usa admin@kailab.co / admin123' }
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  static getCurrentUser(): UserSession | null {
    if (typeof window === 'undefined') return null
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null
    try {
      return JSON.parse(stored) as UserSession
    } catch {
      return null
    }
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }
}
