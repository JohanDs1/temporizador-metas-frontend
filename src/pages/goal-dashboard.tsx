import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { LogOut, Plus } from "lucide-react"
import { GoalDialog } from "../components/goal-dialog"
import { FakeGoals } from "../components/fake-goals"
import { ThemeToggle } from "../components/theme-toggle"
import { displayName } from "@/lib/auth"
import { useAuthStore } from "@/stores/auth-store"
import { useNavigate } from "react-router-dom"
import { mockGoals } from "@/lib/goals.mockdata"
import type { Goal } from "@/types/goals"
import { UserGoals } from "@/components/user-goals"

interface GoalDashboardProps {
  username: string
  onLogout: () => void
}


export function GoalDashboard({ username, onLogout }: GoalDashboardProps) {
  const [mockedGoals, setMockedGoals] = useState<Goal[]>(mockGoals)
  const [now, setNow] = useState<number>(() => Date.now())
  const [mounted, setMounted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Goal | null>(null)
  const { isLoggedIn, user } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    setMounted(true)
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])



  function openNew() {
    setEditing(null)
    setDialogOpen(true)
  }

  function openEdit(goal: Goal) {
    setEditing(goal)
    setDialogOpen(true)
  }

  function handleSaveMockedGoals(goal: Goal) {
    setMockedGoals((prev) => {
      const exists = prev.some((g) => g.id === goal.id)
      return exists ? prev.map((g) => (g.id === goal.id ? goal : g)) : [goal, ...prev]
    })
  }

  /* async function handleSaveUserGoals(goal: Goal) {
    const response = await createGoal(goal)
    if (!response.success) {
      console.error("Error saving user goal:", response.message)
    }
  } */


  return (
    <main className="min-h-svh px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            {
              isLoggedIn && (
                <p className="text-sm font-medium text-muted-foreground">
                  Hola, <span className="text-foreground">{displayName(username)}</span>
                </p>
              )
            }

            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              Temporizador de Metas
            </h1>
            <p className="text-base text-muted-foreground">Enfócate en lo que importa.</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {
              isLoggedIn ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onLogout}
                  className="rounded-full text-muted-foreground"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="size-4" />
                </Button>
              ) :
                (
                  <Button
                    onClick={() => navigate("/login")}
                    className="rounded-full"
                    aria-label="Cerrar sesión"
                  >
                    Iniciar Sesión
                  </Button>
                )

            }
            {
              isLoggedIn && (
                <Button onClick={openNew} className="gap-2 rounded-full px-5 sm:self-auto">
                  <Plus className="size-4" />
                  Nueva meta
                </Button>
              )
            }

          </div>
        </header>

        <section className="mt-8" aria-label="Metas activas">

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {
              isLoggedIn && user ? (
                <UserGoals
                  userId={user?.id}
                  now={now}
                  mounted={mounted}
                  openNew={openNew}
                  openEdit={openEdit}
                />
              ) :
                (
                  <FakeGoals
                    mockedGoals={mockedGoals}
                    setMockedGoals={setMockedGoals}
                    now={now}
                    mounted={mounted}
                    openNew={openNew}
                    openEdit={openEdit}
                  />
                )
            }
          </div>

        </section>
      </div>

      <GoalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        goal={editing}
        onSave={handleSaveMockedGoals}
      />
    </main>
  )
}
