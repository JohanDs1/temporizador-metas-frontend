import type { Goal } from "./goals";
import type { User } from "./user";

export interface ResponseGoals {
    success: boolean;
    message?: string;
    goals: Goal[];
}
export interface ResponseGoal {
    success: boolean;
    message?: string;
    goals: Goal;
}

export interface ResponseUser {
    success: boolean;
    user?: User | null;
    message?: string;
}