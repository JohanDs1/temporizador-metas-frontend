import { useEffect, useState } from "react"
import { Button } from "../components/ui/button"
import { Plus } from "lucide-react"
import { GoalDialog } from "../components/goal-dialog"
import { ThemeToggle } from "../components/theme-toggle"
import { EmptyGoalsState } from "../components/empty-goals-state"
import { GoalCard } from "../components/goal-card"
import { getGoalStatus, mockGoals, type Goal } from "@/lib/goals"


export function GoalDashboard() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals)
  const [now, setNow] = useState<number>(() => Date.now())
  const [mounted, setMounted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Goal | null>(null)

  // Single shared clock: ticks every second and drives every countdown.
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

  function handleSave(goal: Goal) {
    setGoals((prev) => {
      const exists = prev.some((g) => g.id === goal.id)
      return exists ? prev.map((g) => (g.id === goal.id ? goal : g)) : [goal, ...prev]
    })
  }

  function handleDelete(goal: Goal) {
    setGoals((prev) => prev.filter((g) => g.id !== goal.id))
  }

  // Show active/overdue goals before completed ones for better focus.
  const sorted = [...goals].sort((a, b) => {
    const rank = (g: Goal) => (getGoalStatus(g, now) === "completed" ? 1 : 0)
    return rank(a) - rank(b)
  })

  return (
    <main className="min-h-svh px-5 py-10 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-5xl">
        <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground text-balance sm:text-4xl">
              Temporizador de Metas
            </h1>
            <p className="text-base text-muted-foreground">Enfócate en lo que importa.</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button onClick={openNew} className="gap-2 rounded-full px-5 sm:self-auto">
              <Plus className="size-4" />
              Nueva meta
            </Button>
          </div>
        </header>

        <section className="mt-8" aria-label="Metas activas">
          {sorted.length === 0 ? (
            <EmptyGoalsState onCreate={openNew} />
          ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {sorted.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  now={now}
                  mounted={mounted}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      <GoalDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        goal={editing}
        onSave={handleSave}
      />
    </main>
  )
}
