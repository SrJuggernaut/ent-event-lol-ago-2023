'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import { formatDate } from '@/helpers/formatDate'
import useDashboard from '@/hooks/useDashboard'
import { client } from '@/lib/appwrite'
import { DATABASE_ID } from '@/services/frontend/database'
import { TASKS_COLLECTION_ID, getTasks } from '@/services/frontend/tasks'
import { type TaskDocument } from '@/types/tasks'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import { compareDesc } from 'date-fns'
import NextLink from 'next/link'
import { useEffect, useState, type FC } from 'react'

const PAGE_SIZE = 15

const Page: FC = () => {
  const { isReady } = useDashboard(true)
  const [tasks, setTasks] = useState<TaskDocument[]>([])
  const [tasksToShow, setTasksToShow] = useState<TaskDocument[]>([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    if (!isReady) return
    const unsubscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${TASKS_COLLECTION_ID}.documents`, (response) => {
      if (response.events.some((event) => event.endsWith('create'))) {
        const newTasks = [...tasks, response.payload as TaskDocument]
        setTasks(newTasks)
      } else if (response.events.some((event) => event.endsWith('delete'))) {
        const taskToDelete = response.payload as TaskDocument
        const newTasks = tasks.filter((task) => task.$id !== taskToDelete.$id)
        setTasks(newTasks)
      } else if (response.events.some((event) => event.endsWith('update'))) {
        const updatedTask = response.payload as TaskDocument
        const newTasks = tasks.map((task) => {
          if (task.$id === updatedTask.$id) {
            return updatedTask
          }
          return task
        })
        setTasks(newTasks)
      } else {
        console.log(response)
      }
    })
    getTasks()
      .then((tasks) => {
        console.log(tasks)
        setTasks(tasks.documents)
      })
      .catch((error) => {
        console.error(error)
      })
    return () => {
      unsubscribe()
    }
  }, [isReady])
  useEffect(() => {
    if (tasks.length === 0) return
    // Tasks must be ordered first pending, then reviewing, then approved, then rejected, then in that order by createdAt
    const orderedTasks = [...tasks].sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1
      if (a.status !== 'pending' && b.status === 'pending') return 1
      if (a.status === 'reviewing' && b.status !== 'reviewing') return -1
      if (a.status !== 'reviewing' && b.status === 'reviewing') return 1
      if (a.status === 'approved' && b.status !== 'approved') return -1
      if (a.status !== 'approved' && b.status === 'approved') return 1
      if (a.status === 'rejected' && b.status !== 'rejected') return -1
      if (a.status !== 'rejected' && b.status === 'rejected') return 1
      return compareDesc(new Date(a.$createdAt), new Date(b.$createdAt))
    })
    const tasksToShow = orderedTasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
    setTasksToShow(tasksToShow)
  }, [tasks, page])
  return (
    <>
      <Typography variant="h1" align="center">Tareas</Typography>
      <table
        className={css({
          width: '100%',
          borderCollapse: 'collapse',
          borderSpacing: 0,
          border: '1px solid',
          borderColor: 'border',
          '& th, & td': {
            padding: 'small',
            border: '1px solid',
            borderColor: 'border'
          }
        })}
      >
        <thead
          className={css({})}
        >
          <tr>
            <th>Tarea</th>
            <th>Status</th>
            <th>Creado</th>
            <th>Actualizado</th>
            <th>Revisor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tasksToShow.length > 0 && tasksToShow.map((task) => (
            <tr
              key={task.$id}
              className={css({
                '&[data-status="pending"]': {
                  backgroundColor: 'gray.300',
                  color: 'black'
                },
                '&[data-status="reviewing"]': {
                  backgroundColor: 'warning',
                  color: 'warningContrast'
                },
                '&[data-status="approved"]': {
                  backgroundColor: 'success',
                  color: 'successContrast'
                },
                '&[data-status="rejected"]': {
                  backgroundColor: 'danger',
                  color: 'dangerContrast'
                }
              })}
              data-status={task.status}
            >
              <td>{task.task}</td>
              <td>{task.status}</td>
              <td>{formatDate(new Date(task.$createdAt))}</td>
              <td>{formatDate(new Date(task.$updatedAt))}</td>
              <td>{task.reviewer}</td>
              <td>
                <NextLink
                  className={button({ size: 'medium' })}
                  href={`/evidence-review/view?task=${task.$id}`}
                >
                  Revisar
                </NextLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'medium'
        })}
      >
        <Button
          disabled={page === 1}
          onClick={() => { setPage(page - 1) }}
        >
          Anterior
        </Button>
        <Button
          disabled={tasksToShow.length < PAGE_SIZE}
          onClick={() => { setPage(page + 1) }}
        >
          Siguiente
        </Button>
      </div>
    </>
  )
}

export default Page
