export type GoalStatus = "active" | "completed" | "overdue"

export interface Goal {
  id?: number;
  userId: number;
  name: string;
  description?: string | undefined;
  startDate: string;
  targetDate: string;
  completed?: number | undefined;
  created_at?: string;
  updated_at?: string;
}

export interface TimeParts {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number // milliseconds remaining (0 if passed)
}