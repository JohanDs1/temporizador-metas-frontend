import type { ResponseGoals } from "@/lib/responses"

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
