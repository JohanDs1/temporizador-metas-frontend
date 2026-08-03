import type { ResponseUser } from "@/lib/responses"

export const getUser = async (userName: string): Promise<ResponseUser> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_API_URL}/api/users/${userName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        const userData = await response.json()

        if(!response.ok) {
            //console.error("Error fetching user data:", userData)
            return {success: false, message: userData.message}
        }

        return userData
    } catch (error) {
        //console.error("Error fetching user data:", error)
        return {success: false, message: "Error fetching user data"}
    }
}

