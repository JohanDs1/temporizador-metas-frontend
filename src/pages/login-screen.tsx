import { getUser } from "@/api/user"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/stores/auth-store"
import { ArrowRight, Timer } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function LoginScreen() {
    const [username, setUsername] = useState("")
    const [error, setError] = useState<string | null>(null)
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()
    
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!username.trim()) {
            setError("El nombre de usuario es obligatorio")
            return
        }
        setError(null)

        const resultado = await getUser(username)
        if (resultado.success && resultado.user) {
            login(resultado.user)
            navigate("/")
        } else {
            setError("Usuario no encontrado")
        }
    }

    return (
    <main className="relative flex min-h-svh flex-col items-center justify-center px-5 py-12">
      <div className="absolute right-5 top-5 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Timer className="size-7" />
          </div>
          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground text-balance">
            Temporizador de Metas
          </h1>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground text-pretty">
            Ingresa tu nombre de usuario para acceder a tus metas.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4" noValidate>
          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Nombre de usuario</Label>
            <Input
              id="username"
              name="username"
              autoComplete="username"
              autoFocus
              placeholder="p. ej. ana"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value)
                if (error) setError(null)
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "username-error" : undefined}
            />
            {error ? (
              <p id="username-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <Button type="submit" className="gap-2 rounded-full">
            Continuar
            <ArrowRight className="size-4" />
          </Button>
        </form>

      </div>
    </main>
  )
}
