export type GoalStatus = "active" | "completed" | "overdue"

export interface Goal {
  id: number;
  user_id: number;
  name: string;
  description: string | undefined;
  start_date: string;
  target_date: string;
  completed: number | undefined;
  created_at: string;
  updated_at: string;
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
  if (new Date(goal.target_date).getTime() <= now) return "overdue"
  return "active"
}

/** Overall progress (0-100) between start and target dates. */
export function getProgress(goal: Goal, now: number = Date.now()): number {
  const start = new Date(goal.start_date).getTime()
  const end = new Date(goal.target_date).getTime()
  if (end <= start) return 100
  const pct = ((now - start) / (end - start)) * 100
  return Math.min(100, Math.max(0, pct))
}

function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
}

export const mockGoals: Goal[] = [
  {
    id: 1,
    user_id: 1,
    name: "Lanzar mi portafolio",
    description: "Publicar el nuevo sitio con mis proyectos y casos de estudio.",
    start_date: daysFromNow(-12),
    target_date: daysFromNow(9),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 1,
    name: "Correr 10 km sin parar",
    description: "Entrenamiento progresivo, tres veces por semana.",
    start_date: daysFromNow(-30),
    target_date: daysFromNow(0.15),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 1,
    name: "Leer 12 libros este año",
    description: "Leer un libro por mes durante el año.",
    start_date: daysFromNow(-60),
    target_date: daysFromNow(45),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    user_id: 1,
    name: "Entregar el reporte trimestral",
    description: "Consolidar métricas y presentar al equipo.",
    start_date: daysFromNow(-20),
    target_date: daysFromNow(-2),
    completed: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
