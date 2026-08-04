import type { Goal } from "@/types/goals";
import type { User } from "./user";

export interface ResponseGoals {
    success: boolean;
    message?: string;
    goals: Goal[];
}
export interface ResponseGoal {
    success: boolean;
    message?: string;
    goal?: Goal | [];
}

export interface ResponseUser {
    success: boolean;
    user?: User | null;
    message?: string;
}