import Typography from '@/components/ui/Typography'
import { tasks } from '@/services/frontend/tasks'
import { type FC } from 'react'

const Page: FC = () => {
  return (
    <>
      <Typography variant="h1" align='center'>Tareas</Typography>
      <Typography variant="h2" align='center' color="danger">Listos Para La Remontada</Typography>
      <Typography variant="body1">
        Las tareas de remontada son tareas especiales que dan muchos puntos, para completarlas <Typography component="span" weight="bold" color="info" >deberás enviar evidencias de captura dentro de la partida</Typography>, solo partidas del 22 o 23 de Agosto serán válidas.
      </Typography>
      {tasks.filter(task => task.isExtra)?.map((task) => (
        <div
          key={task.id}
        >
          <Typography variant="h3">{task.name} - {task.points} puntos</Typography>
          <Typography variant="body1">{task.description}</Typography>
        </div>
      ))}
      <Typography variant="h2" align='center'>Tareas Regulares</Typography>
      {tasks.filter(task => task.isExtra === undefined || !task.isExtra)?.map((task) => (
        <div
          key={task.id}
        >
          <Typography variant="h3">{task.name} - {task.points} puntos</Typography>
          <Typography variant="body1">{task.description}</Typography>
        </div>
      ))}
    </>
  )
}

export default Page
