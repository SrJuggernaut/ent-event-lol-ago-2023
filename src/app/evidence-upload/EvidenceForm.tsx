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
  evidenceOpGG: string().url('Debes ingresar una URL válida').required('Debes ingresar una URL válida'),
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
              blurDataURL={'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAGQCAMAAABh+/QGAAACH1BMVEUAAAD///8cHiE3skgcHyEcICEcISIcIiIdIyIdJCIdJiMdJSIdJyMdKCMdKSMeLCQeKiMeLSQeMCUeLiQeKyMeLyQfMSUfNiYfNSYfMyUfMiUgPSggOScfNCUgOycgOicgNyYiSSsiRSohQykhQikhPyggPSchPiggPCcgOCYjTywjTiwjTSwiSSoiSCojSisiRyoiRioiRCkhQSghQCgnZDImXTAlWi8lWS8lVy4kVS0kVC0lVi4lVS4kUy0kUi0kUS0kUCwkTywjTSsjTCsjSysiRSksfzksfjksfTkqdTYrdzcqdDYrdjcqczYpbzQpbzUpbjQqcDUpbTQoajMpbDQoaTMoaDMnZTIoZzInZDEoZjInYzEoZTInYjEmYDAnYTEmXzAmXjAnYDAmXS8mXC8mWy8lWC4kUSw2r0c3sUg2rkc2rUY2rUc1q0Y1qkY2rEY2q0Y1qUU1qEU0pkQ0pUQ1p0U0pEQ0o0M0o0QzoUMzoEM0okMzn0IznkIynEEynEIym0ExmEAznUIymkEymUAymUExl0AxlkAymEAxlT8xlD8wkj4wkj8wkT4vjj0xkz8wkD4wjz4vjT0vjD0uiTwwjj0vizwviz0uiDwvijwviTwuhzsuhjsthDotgzouhTstgjouhDstgTotgDktfzksfTgsfDgrejcreTcsezgreDcsejgrdjYrdTYqcjUqcTUpazMoaDI3sEf////YSsmwAAAAtXRSTlP///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AoRwDsAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAJh5JREFUeJzt3WdgFNXeBvA/CRJAwEgECUqRDtIVBQVEishFJRTp7SJkQyCVDtJ7T0EloUiRKsS1d+GqKEoxiqgUr4ggWGgiICjwftjs7sycc/4zs7vZzX15fl/YnZmd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'}
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
