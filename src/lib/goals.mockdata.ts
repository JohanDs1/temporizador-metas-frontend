import type { Goal } from "@/types/goals"
import { daysFromNow } from "./goals.utils"


export const mockGoals: Goal[] = [
  {
    id: 1,
    userId: 1,
    name: "Lanzar mi portafolio",
    description: "Publicar el nuevo sitio con mis proyectos y casos de estudio.",
    startDate: daysFromNow(-12),
    targetDate: daysFromNow(9),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    userId: 1,
    name: "Correr 10 km sin parar",
    description: "Entrenamiento progresivo, tres veces por semana.",
    startDate: daysFromNow(-30),
    targetDate: daysFromNow(0.15),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    userId: 1,
    name: "Leer 12 libros este año",
    description: "Leer un libro por mes durante el año.",
    startDate: daysFromNow(-60),
    targetDate: daysFromNow(45),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    userId: 1,
    name: "Entregar el reporte trimestral",
    description: "Consolidar métricas y presentar al equipo.",
    startDate: daysFromNow(-20),
    targetDate: daysFromNow(-2),
    completed: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
