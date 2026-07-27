import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyGoalsStateProps {
  onCreate?: () => void
}

export function EmptyGoalsState({ onCreate }: EmptyGoalsStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/50 px-6 py-20 text-center">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-secondary">
        <Target className="size-7 text-muted-foreground" aria-hidden="true" />
      </div>
      <h2 className="mt-6 text-xl font-semibold tracking-tight text-foreground">
        Aún no tienes metas
      </h2>
      <p className="mt-2 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
        Define tu primera meta y observa cómo el tiempo corre a tu favor.
      </p>
      <Button onClick={onCreate} className="mt-7 rounded-full px-6">
        Crear mi primera meta
      </Button>
    </div>
  )
}
