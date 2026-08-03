import { getGoals } from "@/api/goals"
import type { Goal } from "@/types/goals"
import { useEffect, useState } from "react"
import { GoalCard } from "./goal-card"
import { EmptyGoalsState } from "./empty-goals-state"
import { GoalCardSkeleton } from "./goal-skeleton"

interface UserGoalsProps {
    userId: number
    now: number
    mounted: boolean
    openNew: () => void
    openEdit: (goal: Goal) => void
}

export function UserGoals({ userId, now, mounted, openNew, openEdit }: UserGoalsProps) {
    const [userGoals, setUserGoals] = useState<Goal[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchGoals = async () => {
            const response = await getGoals(userId)
            if (response.success) {
                setUserGoals(response.goals)
            }
            setLoading(false)
        }
        fetchGoals()
    }, [userId])

    if (loading || !mounted) {
        return <GoalCardSkeleton />
    }

    if (!userGoals) {
        return <p className="text-center text-muted-foreground">No se pudieron cargar las metas del usuario.</p>
    }


    return (
        userGoals.length === 0 ? (
            <EmptyGoalsState onCreate={openNew} />
        ) : (

            userGoals.map((goal) => (
                <GoalCard
                    key={goal.id}
                    goal={goal}
                    now={now}
                    mounted={mounted}
                    onEdit={openEdit}
                //onDelete={handleDelete}
                />
            ))

        )
    )

}