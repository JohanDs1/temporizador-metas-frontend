import { cn } from "@/lib/utils"
import type { GoalStatus, TimeParts } from "@/types/goals"

interface CountdownTimerProps {
  time: TimeParts
  status: GoalStatus
  mounted?: boolean
}

const UNITS: { key: keyof Omit<TimeParts, "total">; label: string }[] = [
  { key: "days", label: "Días" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Min" },
  { key: "seconds", label: "Seg" },
]

function pad(n: number): string {
  return n.toString().padStart(2, "0")
}

export function CountdownTimer({ time, status, mounted = true }: CountdownTimerProps) {
  if (status === "completed") {
    return (
      <div className="rounded-xl bg-secondary/60 px-5 py-6 text-center">
        <p className="text-sm font-medium text-muted-foreground">Meta completada</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">¡Lograda!</p>
      </div>
    )
  }

  if (status === "overdue") {
    return (
      <div className="rounded-xl bg-destructive/8 px-5 py-6 text-center">
        <p className="text-sm font-medium text-destructive">Tiempo agotado</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">Meta vencida</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-4 gap-2 sm:gap-3" role="timer" aria-label="Cuenta regresiva">
      {UNITS.map((unit) => (
        <div
          key={unit.key}
          className="flex flex-col items-center rounded-xl bg-secondary/70 py-4 sm:py-5"
        >
          <span
            className={cn(
              "font-sans text-2xl font-semibold tabular-nums tracking-tight text-foreground sm:text-4xl",
            )}
          >
            {mounted ? pad(time[unit.key]) : "00"}
          </span>
          <span className="mt-1 text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground sm:text-xs">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  )
}
