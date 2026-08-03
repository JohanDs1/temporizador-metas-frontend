import type { Goal } from "@/types/goals"
import { daysFromNow } from "./goals.utils"


export const mockGoals: Goal[] = [
  {
    id: 1,
    user_id: 1,
    name: "Lanzar mi portafolio",
    description: "Publicar el nuevo sitio con mis proyectos y casos de estudio.",
    start_date: daysFromNow(-12),
    target_date: daysFromNow(9),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 2,
    user_id: 1,
    name: "Correr 10 km sin parar",
    description: "Entrenamiento progresivo, tres veces por semana.",
    start_date: daysFromNow(-30),
    target_date: daysFromNow(0.15),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 3,
    user_id: 1,
    name: "Leer 12 libros este año",
    description: "Leer un libro por mes durante el año.",
    start_date: daysFromNow(-60),
    target_date: daysFromNow(45),
    completed: 0,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 4,
    user_id: 1,
    name: "Entregar el reporte trimestral",
    description: "Consolidar métricas y presentar al equipo.",
    start_date: daysFromNow(-20),
    target_date: daysFromNow(-2),
    completed: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]
