import type { Goal, GoalStatus, TimeParts } from "@/types/goals"

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

export function daysFromNow(days: number): string {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()
}