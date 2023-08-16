'use client'
import Typography from '@/components/ui/Typography'
import useDashboard from '@/hooks/useDashboard'
import { getSummonerInfo } from '@/services/frontend/summonerInfo'
import { tasks, type TasksObject } from '@/services/frontend/tasks'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { center } from '@styled/patterns'
import { useEffect, useState, type FC } from 'react'
import TaskController from './TaskController'

const Page: FC = () => {
  const { isReady, user } = useDashboard()
  const [tasksObject, setTasksObject] = useState<TasksObject | undefined>()

  useEffect(() => {
    if (isReady && user !== undefined) {
      getSummonerInfo(user.$id)
        .then((summonerInfo) => {
          if (summonerInfo.tasks !== null) {
            const taskObj: TasksObject = {}
            tasks.forEach((task) => {
              taskObj[task.id] = summonerInfo.tasks !== null ? summonerInfo.tasks.filter((taskSummoner) => taskSummoner.task === task.id) : []
            })
            setTasksObject(taskObj)
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [isReady])

  if (!isReady) {
    return (
      <>
        <Typography variant="h1" align="center">Sube tus evidencias</Typography>
        <div
          className={center()}
        >
          <FontAwesomeIcon icon={faSpinner} spin size="3x" />
        </div>
      </>
    )
  }
  return (
    <>
      <Typography variant="h1" align="center">Sube tus evidencias</Typography>
      {tasks.map((task) => (
        <TaskController key={`task-controller-${task.id}`} task={task} tasks={tasksObject !== undefined ? tasksObject[task.id] : []} onCreated={(taskCreated) => {
          if (tasksObject !== undefined) {
            const tasksObj = { ...tasksObject }
            tasksObj[task.id].push(taskCreated)
            setTasksObject(tasksObj)
          }
        }} />
      ))}
    </>
  )
}

export default Page
