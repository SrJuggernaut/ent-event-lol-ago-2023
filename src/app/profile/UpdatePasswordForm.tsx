import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Typography from '@/components/ui/Typography'
import { updatePassword } from '@/services/frontend/session'
import { type Alert } from '@/types/utilities'
import { css } from '@styled/css'
import { button } from '@styled/recipes'
import { useFormik } from 'formik'
import { useState, type FC } from 'react'
import { object, ref, string } from 'yup'

interface UpdatePasswordData {
  password: string
  passwordConfirmation: string
  oldPassword: string
}

const updatePasswordSchema = object({
  password: string().required('El nuevo password es requerido').min(8, 'El password debe tener al menos 8 caracteres'),
  passwordConfirmation: string().oneOf([ref('password')], 'Los passwords no coinciden').required('La confirmación del password es requerida'),
  oldPassword: string().required('El password actual es requerido')
})

const UpdatePasswordForm: FC = () => {
  const [alert, setAlert] = useState<Alert | undefined>(undefined)
  const formik = useFormik<UpdatePasswordData>({
    initialValues: {
      password: '',
      passwordConfirmation: '',
      oldPassword: ''
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      try {
        await updatePassword(values.password, values.oldPassword)
        setAlert({
          type: 'success',
          message: 'El password se ha actualizado correctamente'
        })
      } catch (error) {
        if (error instanceof Error) {
          setAlert({
            type: 'danger',
            message: error.message
          })
        }
      }
    }
  })
  return (
    <>
      <Typography variant="h2" align="center">Cambiar password</Typography>
      {alert !== undefined && (
        <div
          className={css({
            marginBottom: 'medium'
          })}
        >
          <Typography variant="caption" color={alert.type} component="div">{alert.message}</Typography>
        </div>
      )}
      <form
        onSubmit={formik.handleSubmit}
      >
        <div
          className={css({
            marginBottom: 'medium'
          })}
        >
          <label htmlFor="password">Nuevo password</label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            status={formik.touched.password !== undefined ? (formik.errors.password !== undefined ? 'danger' : 'success') : undefined}
            fullWidth
          />
          {formik.errors.password !== undefined && formik.touched.password !== undefined && (
            <Typography variant="caption" color="danger" component="div">{formik.errors.password}</Typography>
          )}
        </div>
        <div
          className={css({
            marginBottom: 'medium'
          })}
        >
          <label htmlFor="passwordConfirmation">Confirmar nuevo password</label>
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            value={formik.values.passwordConfirmation}
            onChange={formik.handleChange}
            status={formik.touched.passwordConfirmation !== undefined ? (formik.errors.passwordConfirmation !== undefined ? 'danger' : 'success') : undefined}
            fullWidth
          />
          {formik.errors.passwordConfirmation !== undefined && formik.touched.passwordConfirmation !== undefined && (
            <Typography variant="caption" color="danger" component="div">{formik.errors.passwordConfirmation}</Typography>
          )}
        </div>
        <div
          className={css({
            marginBottom: 'medium'
          })}
        >
          <label htmlFor="oldPassword">Password actual</label>
          <Input
            id="oldPassword"
            name="oldPassword"
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            status={formik.touched.oldPassword !== undefined ? (formik.errors.oldPassword !== undefined ? 'danger' : 'success') : undefined}
            fullWidth
          />
          {formik.errors.oldPassword !== undefined && formik.touched.oldPassword !== undefined && (
            <Typography variant="caption" color="danger" component="div">{formik.errors.oldPassword}</Typography>
          )}
        </div>
        <div
          className={css({
            marginBottom: 'medium'
          })}
        >
          <Button
            className={button({ variant: 'solid' })}
            type="submit"
            disabled={!formik.isValid}
          >
            Guardar
          </Button>
        </div>
      </form>
    </>
  )
}

export default UpdatePasswordForm
