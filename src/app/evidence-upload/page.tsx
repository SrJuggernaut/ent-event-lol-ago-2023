'use client'
import Typography from '@/components/ui/Typography'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const Page: FC = () => {
  // const { isReady, user } = useDashboard()
  // const [tasksObject, setTasksObject] = useState<TasksObject | undefined>()

  // useEffect(() => {
  //   if (isReady && user !== undefined) {
  //     getSummonerInfo(user.$id)
  //       .then((summonerInfo) => {
  //         if (summonerInfo.tasks !== null) {
  //           const taskObj: TasksObject = {}
  //           tasks.forEach((task) => {
  //             taskObj[task.id] = summonerInfo.tasks !== null ? summonerInfo.tasks.filter((taskSummoner) => taskSummoner.task === task.id) : []
  //           })
  //           setTasksObject(taskObj)
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error)
  //       })
  //   }
  // }, [isReady])

  // if (!isReady) {
  //   return (
  //     <>
  //       <Typography variant="h1" align="center">Sube tus evidencias</Typography>
  //       <div
  //         className={center()}
  //       >
  //         <FontAwesomeIcon icon={faSpinner} spin size="3x" />
  //       </div>
  //     </>
  //   )
  // }
  // return (
  //   <>
  //     <Typography variant="h1" align="center">Sube tus evidencias</Typography>
  //     <Typography variant="h2" align='center' color="danger">Listos Para La Remontada</Typography>
  //     <Typography variant="body1">
  //       Las tareas de remontada son tareas especiales que dan muchos puntos, para completarlas <Typography component="span" weight="bold" color="info" >deberás enviar evidencias de captura dentro de la partida</Typography>, solo partidas del 22 o 23 de Agosto serán válidas.
  //     </Typography>
  //     {tasks.filter(task => task.isExtra)?.map((task) => (
  //       <TaskController key={`task-controller-${task.id}`} task={task} tasks={tasksObject !== undefined ? tasksObject[task.id] : []} onCreated={(taskCreated) => {
  //         if (tasksObject !== undefined) {
  //           const tasksObj = { ...tasksObject }
  //           tasksObj[task.id].push(taskCreated)
  //           setTasksObject(tasksObj)
  //         }
  //       }} />
  //     ))}
  //     <Typography variant="h2" align='center'>Tareas Regulares</Typography>
  //     {tasks.filter(task => task.isExtra === undefined || !task.isExtra)?.map((task) => (
  //       <TaskController key={`task-controller-${task.id}`} task={task} tasks={tasksObject !== undefined ? tasksObject[task.id] : []} onCreated={(taskCreated) => {
  //         if (tasksObject !== undefined) {
  //           const tasksObj = { ...tasksObject }
  //           tasksObj[task.id].push(taskCreated)
  //           setTasksObject(tasksObj)
  //         }
  //       }} />
  //     ))}
  //   </>
  // )
  return (
    <div
      className={css({
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'medium',
        marginBottom: 'medium',
        minHeight: '30vh'
      })}
    >
      <Typography variant="h2" align="center" component="div">
        Gracias por participar
      </Typography>
      <Typography variant="body1" align="center">
        El evento ha terminado. La entrega de premios se realizará durante las próximas semanas.
      </Typography>
      <Typography variant="body1" align="center">
        Revisa los resultados en el siguiente enlace, Únete a nuestro Discord par más eventos.
      </Typography>
      <div
        className={css({
          display: 'flex',
          gap: 'medium',
          marginTop: 'medium'
        })}
      >
        <NextLink
          className={
            button({
              variant: 'solid',
              color: 'info',
              size: 'medium'
            })
          }
          href="/puntuacion"
        >
          Revisar resultados
        </NextLink>
        <a
          className={
            button({
              variant: 'solid',
              color: 'primary',
              size: 'medium'
            })
          }
          href="http://discord.gg/SYnKcU5"
        >
          Únete a nuestro Discord
        </a>
      </div>
    </div>
  )
}

export default Page
