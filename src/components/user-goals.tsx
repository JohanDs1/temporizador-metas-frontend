import { getGoals } from "@/api/goals"
import type { Goal } from "@/types/goals"
import { useEffect, useState } from "react"
import { GoalCard } from "./goal-card"
import { EmptyGoalsState } from "./empty-goals-state"

interface UserGoalsProps {
    userId: number
    now: number
    mounted: boolean
    openNew: () => void
    openEdit: (goal: Goal) => void
}

export function UserGoals({ userId, now, mounted, openNew, openEdit }: UserGoalsProps) {
    const [userGoals, setUserGoals] = useState<Goal[]>([])

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await getGoals(userId)
            if (response.success) {
                setUserGoals(response.goals)
            }
        }
        fetchGoals()
    }, [userId])

    return (
        userGoals.length === 0 ? (
            <EmptyGoalsState onCreate={openNew} />
        ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {userGoals.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                        now={now}
                        mounted={mounted}
                        onEdit={openEdit}
                        //onDelete={handleDelete}
                    />
                ))}
            </div>
        )
    )

}