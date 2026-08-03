import type { Goal } from "@/types/goals"
import { EmptyGoalsState } from "./empty-goals-state"
import { getGoalStatus } from "@/lib/goals.utils"
import { GoalCard } from "./goal-card"

interface MockedGoalsProps {
    mockedGoals: Goal[]
    setMockedGoals: React.Dispatch<React.SetStateAction<Goal[]>>
    now: number
    mounted: boolean
    openNew: () => void
    openEdit: (goal: Goal) => void
}


export function FakeGoals({ mockedGoals, setMockedGoals, now, mounted, openNew, openEdit }: MockedGoalsProps) {

    function handleDelete(goal: Goal) {
        setMockedGoals((prev) => prev.filter((g) => g.id !== goal.id))
    }


    // Show active/overdue goals before completed ones for better focus.
    const sorted = [...mockedGoals].sort((a, b) => {
        const rank = (g: Goal) => (getGoalStatus(g, now) === "completed" ? 1 : 0)
        return rank(a) - rank(b)
    })

    return (
        sorted.length === 0 ? (
            <EmptyGoalsState onCreate={openNew} />
        ) : (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {sorted.map((goal) => (
                    <GoalCard
                        key={goal.id}
                        goal={goal}
                        now={now}
                        mounted={mounted}
                        onEdit={openEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        )
    )

}