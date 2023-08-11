'use client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Typography from '@/components/ui/Typography'
import useAppDispatch from '@/hooks/useAppDispatch'
import useRedirectIfSession from '@/hooks/useRedirectIfSession'
import { login } from '@/services/frontend/session'
import { setStatus, setUser } from '@/state/sessionSlice'
import { css } from '@styled/css'
import { useFormik } from 'formik'
import { type Metadata } from 'next'
import { type FC } from 'react'
import { object as yupObject, string as yupString } from 'yup'

export const metadata: Metadata = {
  title: 'Iniciar sesión - League Of Rancios - EntGamers',
  description: 'Iniciar sesión para el evento League Of Rancios de League Of Legends traído a ti por EntGamers & Jim RSNG'
}

export interface LoginData {
  email: string
  password: string
}

const loginSchema = yupObject({
  email: yupString().email('El email no es válido').required('El email es requerido'),
  password: yupString().required('La contraseña es requerida')
})

const LoginForm: FC = () => {
  const dispatch = useAppDispatch()
  useRedirectIfSession('/')
  const formik = useFormik<LoginData>({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const user = await login(values.email, values.password)
      dispatch(setUser(user))
      dispatch(setStatus('succeeded'))
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
          Iniciar sesión
        </Button>
      </div>
    </form>
  )
}

export default LoginForm
