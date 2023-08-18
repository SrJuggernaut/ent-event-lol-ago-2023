'use client'
import Button from '@/components/ui/Button'
import TextArea from '@/components/ui/TextArea'
import Typography from '@/components/ui/Typography'
import useDashboard from '@/hooks/useDashboard'
import { getTask, tasks, updateTask } from '@/services/frontend/tasks'
import { type Task, type TaskData } from '@/types/tasks'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import { useFormik } from 'formik'
import NextImage from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, type FC } from 'react'
import { object, string } from 'yup'

const TaskDataSchema = object({
  task: string().required('Este campo es requerido'),
  evidenceImage: string().required('Este campo es requerido'),
  evidenceOpGG: string().required('Este campo es requerido'),
  notes: string().max(256, 'Este campo no puede tener más de 256 caracteres'),
  reviewer: string().required('Este campo es requerido'),
  reviewerNotes: string().max(256, 'Este campo no puede tener más de 256 caracteres'),
  status: string().oneOf(['reviewing', 'pending', 'approved', 'rejected']).required('Este campo es requerido')
})

const Page: FC = () => {
  const { isReady, user } = useDashboard(true)
  const searchParams = useSearchParams()
  const [finishedInitialLoad, setFinishedInitialLoad] = useState(false)
  const [initialStatus, setInitialStatus] = useState<TaskData['status']>()
  const [taskId, setTaskId] = useState('')

  const router = useRouter()

  const formik = useFormik<TaskData>({
    initialValues: {
      task: '',
      evidenceImage: '',
      evidenceOpGG: '',
      notes: '',
      reviewer: '',
      status: 'reviewing',
      reviewerNotes: ''
    },
    onSubmit: async (values) => {
      try {
        await updateTask(taskId, values)
        router.push('/evidence-review')
      } catch (error) {
        console.error(error)
      }
    },
    validationSchema: TaskDataSchema
  })
  const [task, setTask] = useState<Task | undefined>()

  useEffect(() => {
    if (!isReady) return
    if (!searchParams.has('task')) return
    const taskId = searchParams.get('task')
    if (taskId === null || taskId === undefined) return
    setTaskId(taskId)
    updateTask(taskId, { status: 'reviewing' })
      .then(() => {
        getTask(taskId)
          .then((task) => {
            setInitialStatus(task.status)
            formik.setValues({
              task: task.task,
              evidenceImage: task.evidenceImage,
              evidenceOpGG: task.evidenceOpGG,
              notes: task.notes ?? '',
              reviewer: task.reviewer ?? user?.$id,
              status: 'reviewing',
              reviewerNotes: ''
            })
              .then(() => {
                setFinishedInitialLoad(true)
              })
              .catch((error) => {
                console.error(error)
              })
            setTask(tasks.find(taskD => taskD.id === task.task))
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
      })
  }, [isReady, searchParams])
  if (!isReady || !finishedInitialLoad || task === undefined) {
    return (
      <>
        <Typography variant="h1" align="center">Tarea</Typography>
        <Typography variant="body1" align="center">Cargando...</Typography>
      </>
    )
  }
  return (
    <>
      <Typography variant="h1" align="center">Tarea: {task?.name}</Typography>
      <Typography variant="body1">Descripción: {task?.description}</Typography>
      <Typography variant="h2" align="center">Pruebas</Typography>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', mdToXxl: '1fr 1fr' },
          gap: 'medium',
          width: '100%',
          padding: 'small'
        })}
      >
        <div
          className={css({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '100%',
            aspectRatio: '2 / 1'
          })}
        >
          <a
            href={formik.values.evidenceImage}
            target="_blank"
            rel="noreferrer"
          >
            <NextImage
              src={formik.values.evidenceImage}
              alt={formik.values.evidenceImage}
              fill
              objectFit="contain"
            />
          </a>
        </div>
        <div>
          <Typography variant="h3" align="center">Op.GG</Typography>
          <div
            className={css({
              display: 'flex',
              justifyContent: 'center'
            })}
          >
            <a
              className={button({ size: 'medium' })}
              href={formik.values.evidenceOpGG}
              target="_blank"
              rel="noreferrer"
            >
              Abrir en Op.GG
            </a>
          </div>
          {formik.values.notes !== null && formik.values.notes !== undefined && formik.values.notes !== '' && (
            <p><strong>Notas:</strong>{formik.values.notes}</p>
          )}
        </div>
      </div>
      <Typography variant="h2" align="center">Review</Typography>
      <div>
        <label htmlFor="">Notas del revisor</label>
        <TextArea
          id="reviewerNotes"
          name="reviewerNotes"
          placeholder="Notas del revisor"
          value={formik.values.reviewerNotes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          fullWidth
          status={formik.errors.reviewerNotes !== undefined && formik.touched.reviewerNotes !== undefined ? 'danger' : undefined}
        />
        {formik.errors.reviewerNotes !== undefined && formik.touched.reviewerNotes !== undefined && (
          <Typography variant="body1" color="danger">{formik.errors.reviewerNotes}</Typography>
        )}
        <div
          className={css({
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: 'medium',
            gap: 'small'
          })}
        >
          <Button
            type="button"
            variant="solid"
            size="medium"
            color="warning"
            onClick={() => {
              formik.setFieldValue('status', initialStatus)
                .then(() => {
                  formik.handleSubmit()
                })
                .catch((error) => {
                  console.error(error)
                })
            }}
          >
            Cancelar
          </Button>
          <Button
            type="button"
            variant="solid"
            size="medium"
            color="danger"
            onClick={() => {
              formik.setFieldValue('status', 'rejected')
                .then(() => {
                  formik.handleSubmit()
                })
                .catch((error) => {
                  console.error(error)
                })
            }}
          >
            Rechazar
          </Button>
          <Button
            type="button"
            variant="solid"
            size="medium"
            color="success"
            onClick={() => {
              formik.setFieldValue('status', 'approved')
                .then(() => {
                  formik.handleSubmit()
                })
                .catch((error) => {
                  console.error(error)
                })
            }}
          >
            Aprobar
          </Button>

        </div>
      </div>
    </>
  )
}

export default Page
