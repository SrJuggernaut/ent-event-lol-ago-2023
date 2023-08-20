import Button from '@/components/ui/Button'
import ImageDropzone from '@/components/ui/ImageDropzone'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Typography from '@/components/ui/Typography'
import useAppSelector from '@/hooks/useAppSelector'
import { addTaskToSummoner } from '@/services/frontend/summonerInfo'
import { createTask } from '@/services/frontend/tasks'
import { type TaskData, type TaskDocument } from '@/types/tasks'
import { type Alert } from '@/types/utilities'
import { css } from '@styled/css'
import { useFormik } from 'formik'
import NextImage from 'next/image'
import { useCallback, useState, type FC } from 'react'
import { object, string } from 'yup'

export interface EvidenceFormProps {
  taskId: string
  onCreated: (task: TaskDocument) => void
}

export const createTaskSchema = object({
  evidenceImage: string().url('Debes subir una imagen válida').required('Debes subir una imagen válida'),
  evidenceOpGG: string().url('Debes ingresar una URL válida').required('Debes ingresar una URL válida').matches(/^http/, 'Debes ingresar una URL válida'),
  notes: string().max(256, 'Las notas no pueden tener más de 256 caracteres')
})

const EvidenceForm: FC<EvidenceFormProps> = ({ onCreated, taskId }) => {
  const { user } = useAppSelector((state) => state.session)
  const [alert, setAlert] = useState<Alert | undefined>()
  const formik = useFormik<TaskData>({
    initialValues: {
      task: taskId,
      evidenceImage: '',
      evidenceOpGG: ''
    },
    onSubmit: async (values) => {
      try {
        const createdTask = await createTask({ task: taskId, evidenceImage: values.evidenceImage, evidenceOpGG: values.evidenceOpGG, notes: values.notes })
        await addTaskToSummoner(user?.$id as string, createdTask.$id)
        onCreated(createdTask)
        setAlert({ type: 'success', message: '¡Tarea creada exitosamente!' })
      } catch (error) {
        console.error(error)
        setAlert({ type: 'danger', message: 'Hubo un error al crear la tarea' })
      }
    },
    validationSchema: createTaskSchema
  })

  const handleImageChange = useCallback((url: string): void => {
    formik.setFieldValue('evidenceImage', url)
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <form
      className={css({
        backgroundColor: 'surface',
        borderRadius: 'small',
        padding: 'medium',
        marginTop: 'medium'
      })}
      onSubmit={formik.handleSubmit}
    >
      {alert !== undefined && (
        <Typography variant="caption" color={alert.type === 'danger' ? 'danger' : alert.type === 'success' ? 'success' : undefined} component="div">{alert.message}</Typography>
      )}
      <Typography variant="h3" component="div" >
        Imagen de evidencia
      </Typography>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
          gap: 'medium'
        })}
      >
        <div>
          <ImageDropzone onChange={handleImageChange} />
        </div>
        <div
          className={css({
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 'small',
            aspectRatio: '2/1'
          })}
        >
          {formik.values.evidenceImage !== '' && (
            <NextImage
              src={formik.values.evidenceImage}
              alt="Imagen de evidencia"
              fill
              className={css({
                objectFit: 'contain'
              })}
              placeholder='blur'
              blurDataURL="data:image/png;base64,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"
            />
          )}
        </div>
      </div>
      {formik.touched.evidenceImage !== undefined && formik.errors.evidenceImage !== undefined && (
        <Typography variant="caption" color="danger" component='div'>{formik.errors.evidenceImage}</Typography>
      )}
      <div
        className={css({
          marginTop: 'medium'
        })}
      >
        <label htmlFor="evidenceOpGG">Link de <a href="https://www.op.gg">OP.gg</a> de la partida</label>
        <Input
          id="evidenceOpGG"
          name="evidenceOpGG"
          type="url"
          onChange={formik.handleChange}
          value={formik.values.evidenceOpGG}
          onBlur={formik.handleBlur}
          status={formik.touched.evidenceOpGG !== undefined && formik.errors.evidenceOpGG !== undefined ? 'danger' : undefined}
          fullWidth
        />
        {formik.touched.evidenceOpGG !== undefined && formik.errors.evidenceOpGG !== undefined
          ? (
            <Typography variant="caption" color="danger" component='div'>{formik.errors.evidenceOpGG}</Typography>
          )
          : (
            <Typography variant="caption" component='div'>
              Para obtener el link de una partida deberás ir a <a href="https://www.op.gg">OP.gg</a>, buscarte por nombre de invocador y copiar el link de la partida que quieras enviar como prueba, se recomienda que al iniciar tu partida vayas a la sección &quot;Juegos en vivo&quot; selecciones la opción &quot;grabar&quot;, lo que nos permitirá tener una repetición de la partida que podríamos usar en un video de resumen del evento.
            </Typography>
          )

        }
      </div>
      <div
        className={css({
          marginTop: 'medium'
        })}
      >
        <label htmlFor="notes">Notas</label>
        <TextArea
          id="notes"
          name="notes"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.notes}
          status={formik.touched.notes !== undefined && formik.errors.notes !== undefined ? 'danger' : undefined}
          fullWidth
        />
        {formik.touched.notes !== undefined && formik.errors.notes !== undefined && (
          <Typography variant="caption" color="danger" component='div'>{formik.errors.notes}</Typography>
        )}
      </div>

      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 'small'
        })}
      >
        <Button
          variant="solid"
          type="submit"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          Enviar evidencia
        </Button>
      </div>
    </form>
  )
}

export default EvidenceForm
