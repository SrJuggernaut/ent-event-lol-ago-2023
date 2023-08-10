'use client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Typography from '@/components/ui/Typography'
import { css } from '@styled/css'
import { useFormik } from 'formik'
import { type FC } from 'react'
import { object as yupObject, ref as yupRef, string as yupString } from 'yup'

export interface RegisterData {
  email: string
  password: string
  confirmPassword: string
}

const registerSchema = yupObject({
  email: yupString().email('El email no es válido').required('El email es requerido'),
  password: yupString().min(8, 'La contraseña debe tener al menos 8 caracteres').required('La contraseña es requerida'),
  confirmPassword: yupString().oneOf([yupRef('password')], 'Las contraseñas no coinciden').required('La confirmación de contraseña es requerida')
})

const RegisterForm: FC = () => {
  const formik = useFormik<RegisterData>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log(values)
    }
  })
  return (
    <form
      onSubmit={formik.handleSubmit}
    >
      <div
        className={css({ marginBottom: 'small' })}
      >
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          name="email"
          type='email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched.email !== undefined ? formik.errors.email !== undefined ? 'danger' : 'success' : undefined}
          fullWidth
        />
        {formik.errors.email !== undefined && formik.touched.email !== undefined && (
          <Typography variant='caption' color="danger" component="div" >{formik.errors.email}</Typography>
        )}
      </div>
      <div
        className={css({ marginBottom: 'small' })}
      >
        <label htmlFor="password">Contraseña</label>
        <Input
          id="password"
          name="password"
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched.password !== undefined ? formik.errors.password !== undefined ? 'danger' : 'success' : undefined}
          fullWidth
        />
        {formik.errors.password !== undefined && formik.touched.password !== undefined && (
          <Typography variant='caption' color="danger" component="div" >{formik.errors.password}</Typography>
        )}
      </div>
      <div
        className={css({ marginBottom: 'small' })}
      >
        <label htmlFor="confirmPassword">Confirmar contraseña</label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type='password'
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          status={formik.touched.confirmPassword !== undefined ? formik.errors.confirmPassword !== undefined ? 'danger' : 'success' : undefined}
          fullWidth
        />
        {formik.errors.confirmPassword !== undefined && formik.touched.confirmPassword !== undefined && (
          <Typography variant='caption' color="danger" component="div" >{formik.errors.confirmPassword}</Typography>
        )}
      </div>
      <div
        className={css({
          display: 'flex',
          justifyContent: 'flex-end',
          marginBlock: 'small'
        })}
      >
        <Button
          component="button"
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting || !formik.dirty || formik.isValidating}
        >
          Registrarse
        </Button>
      </div>
    </form>
  )
}

export default RegisterForm
