import { ID, Query, databases } from '@/lib/appwrite'
import { DATABASE_ID } from '@/services/frontend/database'
import { type Task, type TaskData, type TaskDocument, type TaskDocumentList } from '@/types/tasks'

export const TASKS_COLLECTION_NAME = 'tasks'
export const TASKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID ?? TASKS_COLLECTION_NAME

export const createTask = async (taskData: TaskData): Promise<TaskDocument> => {
  const taskDocument = await databases.createDocument<TaskDocument>(DATABASE_ID, TASKS_COLLECTION_ID, ID.unique(), taskData)
  return taskDocument
}

export const getTask = async (taskId: string): Promise<TaskDocument> => {
  const taskDocument = await databases.getDocument<TaskDocument>(DATABASE_ID, TASKS_COLLECTION_ID, taskId)
  return taskDocument
}

export const getTasks = async (): Promise<TaskDocumentList> => {
  const taskDocuments = await databases.listDocuments<TaskDocument>(DATABASE_ID, TASKS_COLLECTION_ID, [Query.limit(100000)])
  return taskDocuments
}

export const updateTask = async (taskId: string, taskData: Partial<TaskData>): Promise<TaskDocument> => {
  const taskDocument = await databases.updateDocument<TaskDocument>(DATABASE_ID, TASKS_COLLECTION_ID, taskId, taskData)
  return taskDocument
}

export const tasks: Task[] = [
  { id: 'alma', name: 'Dragón-slayer', description: 'Consigue el alma de dragón antes del minuto 33.', points: 50, isExtra: true },
  { id: 'heraldos', name: 'Gerardo slayer', description: 'Consigue los dos heraldos de la grieta', points: 50, isExtra: true },
  { id: 'tier2', name: 'Mi compa el Gerardo', description: 'Consigue que el heraldo destruya torre tier 2', points: 50, isExtra: true },
  { id: 'torrent', name: 'Only push', description: 'Destruye la torreta del enemigo antes del minuto 14', points: 50, isExtra: true },
  { id: 'loltop', name: 'Lol es mi única vida ', description: 'Consigue un mínimo de 500 de vida extra con el ítem Corazón de Acero.', points: 60, isExtra: true },
  { id: 'loljg', name: 'No ocupas ganks', description: 'Obtén la ultima mejora del hechizo Castigo antes del minuto 17:30', points: 40, isExtra: true },
  { id: 'veigarAp', name: 'Sin Ap', description: 'Consigue 950 de ap con Veigar (solo en grieta del invocador)', points: 60, isExtra: true },
  { id: 'nasus', name: 'Who left the dogs out ', description: 'Consigue 800 stacks de la Q con nasus (solo en grieta del invocador)', points: 60, isExtra: true },
  { id: 'Ranked', name: 'Clasificado Campeón', description: 'Termina tus 5 placements y obtén un poco rango', points: 5 },
  { id: 'Pentakill', name: 'Pentakill Maestro', description: 'Realiza un Pentakill. Misión solo disponible en Grieta del invocador', points: 80 },
  { id: 'Asesino', name: 'Cazador de Objetivos', description: 'Consigue el mayor número de asesinatos en una partida', points: 10 },
  { id: 'Remontada', name: 'El Protegido del Nexo', description: 'Gana una partida donde hayas tenido al menos 1 inhibidor caído', points: 10 },
  { id: 'Legendario', name: 'Inmortalidad Efímera', description: 'Logra una racha de muertes sin morir mayor o igual a 6', points: 10 },
  { id: 'Asistencia', name: 'Asistencia Maestra', description: 'Acumula la mayor cantidad de asistencias en una partida (Mínimo 40 asistencias.)', points: 10 },
  { id: 'DragonSlayer', name: 'El Ojo del Dragón', description: 'Logra la mayor cantidad de eliminaciones de dragones en una partida (5 Dragones mínimo)', points: 25 },
  { id: 'Baron', name: 'Barón Épico', description: 'Atrévete a enfrentar al Barón Nashor y asegura el buff para tu equipo. Si logras esto, recibirás una generosa recompensa de puntos.', points: 5 },
  { id: 'Heraldo', name: 'Maestro de la Jungla', description: 'Demuestra tus habilidades en la jungla y obtén el primer asesinato del Heraldo de la grieta.', points: 5 },
  { id: 'Visión', name: 'Estratega Visionario', description: 'Coloca la mayor cantidad de centinelas de visión y controles de visión en una partida (Mínimo 60 puntos de visión)', points: 25 },
  { id: 'Cargado', name: 'Soy jim mochila!!', description: 'Gana una partida donde hayas estado negativo durante la mayor parte de la partida y hayas remontado', points: 30 },
  { id: 'soporte', name: 'El mejor cc es matar', description: 'En una partida consigue 15 asesinatos o más teniendo el ítem de soporte mejorado al máximo ', points: 25 },
  { id: 'CC', name: 'El enemigo no se quiso mover', description: 'Obtén una puntuación de control de masas mayor o igual a 80 en una partida', points: 40 },
  { id: 'Jhin', name: 'Soy Sublime', description: 'Termina una partida con Jhin con al menos dos 4 en el Kda (ejemplo 4/1/24)', points: 44 },
  { id: 'Invade', name: 'La mejor cura es mandarte a base', description: 'Consigue un asesinato antes que lleguen los súbditos a linea (min 1.55)', points: 5 },
  { id: 'ADC', name: 'Atacar de cerquita', description: 'Juega como ADC una partida en la grieta del invocador', points: 10 },
  { id: 'Soporte', name: 'Si tengo cc soy soporte', description: 'Juega como SOPORTE una partida en la grieta del invocador.', points: 10 },
  { id: 'Mid', name: '¿Rotar? ¿Qué es eso?', description: 'Juega como MID una partida en la grieta del invocador.', points: 10 },
  { id: 'Top', name: 'A montar una granja', description: 'Juega como TOP una partida en la grieta del invocador.', points: 10 },
  { id: 'Jungla  ', name: 'No ganks hasta min 30', description: 'Juega como JUNGLA una partida en la grieta del invocador.', points: 10 },
  { id: 'Aram', name: 'Vamos a pelear', description: 'Juega una partida de ARAM', points: 10 },
  { id: 'Late', name: 'Llegamos a late game', description: 'Juega una partida con duración mínima de 35 minutos', points: 30 },
  { id: 'Farm', name: 'A farmear', description: 'Consigue farmear 300 minions en una partida ', points: 30 },
  { id: 'FullBuild', name: 'Ahora puedo combatir', description: 'Consigue 5 items legendarios y mítico (full build) en la grieta del invocador', points: 30 },
  { id: 'Paliza', name: 'Paliza', description: 'Gana una partida en la grieta del invocador con un marcador global mayor a 20 muertes con respecto al equipo enemigo', points: 30 },
  { id: 'Honor', name: 'Jugador con honor', description: 'Consigue un nivel de honor mayor o igual al nivel 2', points: 10 },
  { id: 'Maestría', name: 'Masterizando este juego', description: 'Saca una S+ con cualquier campeón.', points: 10 }
]

export type TasksObject = Record<Task['id'], TaskDocument[]>
