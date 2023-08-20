import Typography from '@/components/ui/Typography'
import { getSummoners } from '@/services/backend/summonerInfo'
import { tasks } from '@/services/frontend/tasks'
import { type FC } from 'react'
import PuntuacionTable from './PuntuacionTable'

export interface SummonerData {
  id: string
  summonerName: string
  pendingPoints: number
  approvedPoints: number
}

const getData = async (): Promise<SummonerData[]> => {
  const summoners = await getSummoners()
  const summonersData: SummonerData[] = summoners.documents.map((summoner) => {
    let pendingPoints = 0
    let approvedPoints = 0
    summoner.tasks?.forEach((task) => {
      const currentTask = tasks.find((t) => t.id === task.task)
      if (currentTask === undefined) return
      if (task.status === 'pending' || task.status === 'reviewing') {
        pendingPoints += currentTask.points
      } else if (task.status === 'approved') {
        approvedPoints += currentTask.points
      }
    })
    return {
      id: summoner.$id,
      summonerName: summoner.summonerName,
      approvedPoints,
      pendingPoints
    }
  })
  summonersData.sort((a, b) => (b.approvedPoints + b.pendingPoints) - (a.approvedPoints + a.pendingPoints))
  return summonersData ?? []
}

const Page: FC = async () => {
  const summonersData = await getData()

  return (
    <>
      <Typography variant="h1" align="center">Tabla de puntuación</Typography>
      <PuntuacionTable data={summonersData} />
      <div>
        <Typography variant="h2" component="span" >Notas</Typography>
        <Typography id="pendientes">
          <Typography component="span" weight="bold" color="danger" >Puntos pendientes:</Typography> Son puntos otorgados por pruebas que aún no han sido revisadas por el equipo de revisión.
        </Typography>
        <Typography id="aprobados">
          <Typography component="span" weight="bold" color="success">Puntos aprobados:</Typography> Son puntos otorgados por pruebas que ya han sido revisadas por el equipo de revisión.
        </Typography>
        <Typography id="totales">
          <Typography component="span" weight="bold" color="warning">Total:</Typography> Es la suma de los puntos pendientes y los puntos aprobados, que te dan tu posición en la tabla de puntuación.
        </Typography>
        <Typography >
          La tabla de puntuación se actualiza aproximadamente cada 5 minutos.
        </Typography>
      </div>
    </>
  )
}

export default Page

export const revalidate = 300 // 5 minutes
