import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { Goal } from "@/types/goals"

interface GoalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal?: Goal | null
  onSave: (goal: Goal) => void
}

function toDateInput(iso?: string): string {
  if (!iso) return ""
  return new Date(iso).toISOString().slice(0, 10)
}

export function GoalDialog({ open, onOpenChange, goal, onSave }: GoalDialogProps) {
  const isEditing = Boolean(goal)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState("")
  const [targetDate, setTargetDate] = useState("")

  useEffect(() => {
    if (!open) return
    setName(goal?.name ?? "")
    setDescription(goal?.description ?? "")
    setStartDate(toDateInput(goal?.startDate) || new Date().toISOString().slice(0, 10))
    setTargetDate(toDateInput(goal?.targetDate))
  }, [open, goal])

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!name.trim() || !targetDate) return
    onSave({
      id: goal?.id ?? Math.floor(Math.random() * 1000000), // Temporary ID for new goals
      userId: goal?.userId ?? 1, // Default user ID for new goals
      name: name.trim(),
      description: description.trim() || undefined,
      startDate: new Date(startDate || Date.now()).toISOString(),
      targetDate: new Date(`${targetDate}T23:59:59`).toISOString(),
      completed: goal?.completed,
      created_at: goal?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl tracking-tight">
            {isEditing ? "Editar meta" : "Nueva meta"}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? "Actualiza los detalles de tu meta."
              : "Define qué quieres lograr y para cuándo."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal-name">Nombre</Label>
            <Input
              id="goal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej. Terminar el curso de diseño"
              autoFocus
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal-description">Descripción (opcional)</Label>
            <Textarea
              id="goal-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Añade un poco de contexto…"
              rows={3}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="goal-start">Fecha de inicio</Label>
              <Input
                id="goal-start"
                type="date"
                value={startDate}
                onChange={(e) => {
                  console.log("Start date changed:", e.target.value)
                  setStartDate(e.target.value)}}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="goal-target">Fecha objetivo</Label>
              <Input
                id="goal-target"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="rounded-full px-6">
              {isEditing ? "Guardar cambios" : "Crear meta"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
