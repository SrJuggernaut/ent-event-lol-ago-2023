import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import { type Task, type TaskDocument } from '@/types/tasks'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import NextImage from 'next/image'
import { useState, type FC } from 'react'
import EvidenceForm from './EvidenceForm'

export interface TaskControllerProps {
  task: Task
  tasks: TaskDocument[]
  onCreated: (task: TaskDocument) => void
}

const TaskController: FC<TaskControllerProps> = ({ task, tasks, onCreated }) => {
  const [showForm, setShowForm] = useState(false)
  return (
    <div>
      <Typography variant="h2">{task.name} - {task.points} puntos</Typography>
      <Typography variant="body1">{task.description}</Typography>
      {tasks.length > 0 && tasks.map((taskDocument) => (
        <div
          key={`task-document-${taskDocument.$id}`}
          className={css({
            display: 'flex',
            alignItems: 'center',
            gap: 'medium',
            width: '100%',
            padding: 'small',
            borderRadius: 'small',
            marginBottom: '10px',
            '&[data-status="pending"]': {
              backgroundColor: 'gray.300',
              color: 'black'
            },
            '&[data-status="reviewing"]': {
              backgroundColor: 'info',
              color: 'infoContrast'
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
          data-status={taskDocument.status}
        >
          <NextImage src={taskDocument.evidenceImage} alt={`task-evidence-${taskDocument.$id}`} width={90} height={90} />
          <a className={button({ size: 'medium' })} href={taskDocument.evidenceOpGG} target="_blank" rel="noreferrer">Op.GG</a>
          <span><strong>Status:</strong> {
            taskDocument.status === 'pending'
              ? 'Pendiente de aprobación'
              : taskDocument.status === 'reviewing'
                ? 'En revision'
                : taskDocument.status === 'approved'
                  ? 'Aprobado'
                  : taskDocument.status === 'rejected'
                    ? 'Rechazado'
                    : 'Desconocido'
          }</span>
          {taskDocument.reviewerNotes !== undefined && taskDocument.reviewerNotes !== null && taskDocument.reviewerNotes.trim() !== '' && (
            <span><strong>Notas del revisor:</strong> {taskDocument.reviewerNotes}</span>
          )}
        </div>
      ))}
      {!(tasks.some((taskDocument) => taskDocument.status === 'approved') || tasks.some((taskDocument) => taskDocument.status === 'pending') || tasks.some((taskDocument) => taskDocument.status === 'reviewing'))
        ? (
          <Button
            className={css({
              marginTop: '10px'
            })}
            onClick={() => { setShowForm(!showForm) }}
          >
            Subir evidencia
          </Button>
        )
        : (
          <Typography variant="body1">Ya subiste una evidencia para esta tarea</Typography>
        )
      }
      {showForm && (
        <EvidenceForm
          taskId={task.id}
          onCreated={(taskDocument) => {
            onCreated(taskDocument)
            setShowForm(false)
          }}
        />
      )}
    </div>
  )
}

export default TaskController
