import { CalendarDays, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { CountdownTimer } from "@/components/countdown-timer"
import { getGoalStatus, getProgress, getTimeRemaining, type Goal } from "@/lib/goals"

interface GoalCardProps {
  goal: Goal
  now: number
  mounted?: boolean
  onEdit?: (goal: Goal) => void
  onDelete?: (goal: Goal) => void
}

const STATUS_META: Record<
  ReturnType<typeof getGoalStatus>,
  { label: string; className: string; dot: string }
> = {
  active: {
    label: "Activa",
    className: "bg-accent-blue/10 text-accent-blue border-transparent",
    dot: "bg-accent-blue",
  },
  completed: {
    label: "Completada",
    className: "bg-secondary text-muted-foreground border-transparent",
    dot: "bg-muted-foreground",
  },
  overdue: {
    label: "Vencida",
    className: "bg-destructive/10 text-destructive border-transparent",
    dot: "bg-destructive",
  },
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function GoalCard({ goal, now, mounted = true, onEdit, onDelete }: GoalCardProps) {
  const status = getGoalStatus(goal, now)
  const time = getTimeRemaining(goal.targetDate, now)
  const progress = getProgress(goal, now)
  const meta = STATUS_META[status]

  return (
    <article className="group rounded-3xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] sm:p-7">
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <Badge
            variant="outline"
            className={cn("gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", meta.className)}
          >
            <span className={cn("size-1.5 rounded-full", meta.dot)} aria-hidden="true" />
            {meta.label}
          </Badge>
          <h2 className="text-balance text-lg font-semibold leading-snug tracking-tight text-foreground">
            {goal.name}
          </h2>
          {goal.description ? (
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              {goal.description}
            </p>
          ) : null}
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground opacity-100 transition-all outline-none hover:bg-secondary focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-ring data-[popup-open]:bg-secondary data-[popup-open]:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100">
            <MoreHorizontal className="size-4" />
            <span className="sr-only">Opciones de la meta</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 rounded-xl">
            <DropdownMenuItem onClick={() => onEdit?.(goal)} className="gap-2">
              <Pencil className="size-4" />
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete?.(goal)}
              className="gap-2 text-destructive focus:text-destructive"
            >
              <Trash2 className="size-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="mt-6">
        <CountdownTimer time={time} status={status} mounted={mounted} />
      </div>

      {status === "active" ? (
        <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-accent-blue transition-all duration-500"
            style={{ width: `${mounted ? progress : 0}%` }}
          />
        </div>
      ) : null}

      <footer className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
        <span>Fecha objetivo: {formatDate(goal.targetDate)}</span>
      </footer>
    </article>
  )
}
