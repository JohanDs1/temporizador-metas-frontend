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