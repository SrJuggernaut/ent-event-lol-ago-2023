import Typography from '@/components/ui/Typography'
import { getSummoners } from '@/services/backend/summonerInfo'
import { tasks } from '@/services/frontend/tasks'
import { css } from '@styled/css'
import { type FC } from 'react'

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
      <div
        className={css({
          minHeight: '75vh'
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: '1fr 2fr' },
            gap: 'medium',
            padding: 'small'
          })}
        >
          <Typography variant='h2' component="span" >Nombre de invocador</Typography>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              alignItems: 'center',
              justifyItems: 'center'
            })}
          >
            <Typography className={css({ fontSize: 'h3', color: 'danger', fontFamily: 'heading', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' })}component="span">Pendientes<a href="#pendientes">*</a></Typography>
            <Typography className={css({ fontSize: 'h3', color: 'success', fontFamily: 'heading', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' })}component="span">Aprobados<a href="#aprobados">*</a></Typography>
            <Typography className={css({ fontSize: 'h3', color: 'info', fontFamily: 'heading', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' })}component="span">Totales<a href="#totales">*</a></Typography>
          </div>
        </div>
        {summonersData.map((summoner) => (
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: '1fr 2fr' },
              gap: 'medium',
              padding: 'small'
            })}
            key={summoner.id}
          >
            <div>
              <Typography variant='h3' component="span" >{summoner.summonerName}</Typography>
            </div>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 'small',
                alignItems: 'center',
                justifyItems: 'center'
              })}
            >
              <Typography className={css({ fontSize: 'h3', color: 'danger', fontFamily: 'body', fontWeight: '700' })} component="span">{summoner.pendingPoints}</Typography>
              <Typography className={css({ fontSize: 'h3', color: 'success', fontFamily: 'body', fontWeight: '700' })} component="span">{summoner.approvedPoints}</Typography>
              <Typography className={css({ fontSize: 'h3', color: 'info', fontFamily: 'body', fontWeight: '700' })} component="span">{summoner.pendingPoints + summoner.approvedPoints}</Typography>
            </div>
          </div>
        ))}
      </div>
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
