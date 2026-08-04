import type { ResponseGoal, ResponseGoals } from "@/lib/responses"
import type { Goal } from "@/types/goals"

export const getGoals = async (userId: number): Promise<ResponseGoals> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/goals?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const userData = await response.json()

        if (!response.ok) {
            //console.error("Error fetching user data:", userData)
            return { success: false, message: userData.message, goals: [] }
        }

        return userData
    } catch (error) {
        //console.error("Error fetching user data:", error)
        return { success: false, message: "Error fetching user data", goals: [] }

    }
}


export const getGoalById = async (goalId: number,userId: number): Promise<ResponseGoal> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/goals/${goalId}?userId=${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const userData = await response.json()

        if (!response.ok) {
            //console.error("Error fetching goal data:", userData)
            return { success: false, message: userData.message, goal: [] }
        }
        return userData
    }
    catch (error) {
        //console.error("Error fetching goal data:", error)
        return { success: false, message: "Error fetching goal data", goal: [] }
    }
}



export const createGoal = async (goal: Goal): Promise<ResponseGoals> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/goals`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(goal),
        })
        const userData = await response.json()

        if (!response.ok) {
            //console.error("Error creating goal:", userData)
            return { success: false, message: userData.message, goals: [] }
        }
        return userData
    } catch (error) {
        //console.error("Error creating goal:", error)
        return { success: false, message: "Error creating goal", goals: [] }
    }
}

/* export const updateGoal = async (goal: Partial<Goal> & { id: number }): Promise<ResponseGoal> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/goals/${goal.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(goal),
        })
        const userData = await response.json()

        if (!response.ok) {
            //console.error("Error updating goal:", userData)
            return { success: false, message: userData.message }
        }
        return userData
    }
    catch (error) {
        //console.error("Error updating goal:", error)
        return { success: false, message: "Error updating goal" }
    }
} */

export const deleteGoal = async (goalId: number, userId: number): Promise<ResponseGoal> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/goals/${goalId}?userId=${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const userData = await response.json()

        if (!response.ok) {
            //console.error("Error deleting goal:", userData)
            return { success: false, message: userData.message }
        }
        return userData
    } catch (error) {
        //console.error("Error deleting goal:", error)
        return { success: false, message: "Error deleting goal" }
    }
}

