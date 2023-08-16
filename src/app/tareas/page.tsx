import Typography from '@/components/ui/Typography'
import { tasks } from '@/services/frontend/tasks'
import { type FC } from 'react'

const Page: FC = () => {
  return (
    <>
      <Typography variant="h1" align='center'>Tareas</Typography>
      {tasks?.map((task) => (
        <div
          key={task.id}
        >
          <Typography variant="h2">{task.name} - {task.points} puntos</Typography>
          <Typography variant="body1">{task.description}</Typography>
        </div>
      ))}
    </>
  )
}

export default Page
