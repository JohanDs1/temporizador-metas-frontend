export type GoalStatus = "active" | "completed" | "overdue"

export interface Goal {
  id: string
  name: string
  description?: string
  startDate: string // ISO string
  targetDate: string // ISO string
  completed?: boolean
}

export interface TimeParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number // milliseconds remaining (0 if passed)
}

/** Returns the remaining time between now and the target date. */
export function getTimeRemaining(target: string, now: number = Date.now()): TimeParts {
  const total = Math.max(0, new Date(target).getTime() - now)
  const seconds = Math.floor((total / 1000) % 60)
  const minutes = Math.floor((total / 1000 / 60) % 60)
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
  const days = Math.floor(total / (1000 * 60 * 60 * 24))
  return { days, hours, minutes, seconds, total }
}

/** Derives the display status of a goal at a given moment. */
export function getGoalStatus(goal: Goal, now: number = Date.now()): GoalStatus {
  if (goal.completed) return "completed"
  if (new Date(goal.targetDate).getTime() <= now) return "overdue"
  return "active"
}

/** Overall progress (0-100) between start and target dates. */
export function getProgress(goal: Goal, now: number = Date.now()): number {
  const start = new Date(goal.startDate).getTime()
  const end = new Date(goal.targetDate).getTime()
  if (end <= start) return 100
  const pct = ((now - start) / (end - start)) * 100
  return Math.min(100, Math.max(0, pct))
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
}

export const mockGoals: Goal[] = [
  {
    id: "1",
    name: "Lanzar mi portafolio",
    description: "Publicar el nuevo sitio con mis proyectos y casos de estudio.",
    startDate: daysFromNow(-12),
    targetDate: daysFromNow(9),
  },
  {
    id: "2",
    name: "Correr 10 km sin parar",
    description: "Entrenamiento progresivo, tres veces por semana.",
    startDate: daysFromNow(-30),
    targetDate: daysFromNow(0.15),
  },
  {
    id: "3",
    name: "Leer 12 libros este año",
    startDate: daysFromNow(-60),
    targetDate: daysFromNow(45),
  },
  {
    id: "4",
    name: "Entregar el reporte trimestral",
    description: "Consolidar métricas y presentar al equipo.",
    startDate: daysFromNow(-20),
    targetDate: daysFromNow(-2),
    completed: true,
  },
]
