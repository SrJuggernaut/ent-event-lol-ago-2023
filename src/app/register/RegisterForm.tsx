'use client'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Typography from '@/components/ui/Typography'
import useRedirectIfSession from '@/hooks/useRedirectIfSession'
import { register } from '@/services/frontend/session'
import { css } from '@styled/css'
import { AppwriteException } from 'appwrite'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import { type FC } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from 'react-google-recaptcha-v3'
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
  useRedirectIfSession('/')
  const { executeRecaptcha } = useGoogleReCaptcha()
  const router = useRouter()
  const formik = useFormik<RegisterData>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        if (executeRecaptcha === undefined) {
          return
        }
        const token = await executeRecaptcha('register')
        const response = await fetch('/register/recaptcha', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            token
          })
        })
        console.log(await response.json())
        await register(values.email, values.password)
        router.push('/login')
      } catch (error) {
        if (error instanceof AppwriteException) {
          if (error.code === 409) {
            formik.setErrors({
              email: 'Ese email no está disponible'
            })
          } else if (error.code === 429) {
            formik.setErrors({
              email: 'Demasiados intentos, por favor intenta más tarde'
            })
          }
        }
      }
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
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting || !formik.dirty || formik.isValidating}
        >
          Registrarse
        </Button>
      </div>
    </form>
  )
}

const WrappedRegisterForm: FC = () => (
  <GoogleReCaptchaProvider
    reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY ?? ''}
    scriptProps={{
      async: true,
      defer: true,
      appendTo: 'head'
    }}
  >
    <RegisterForm />
  </GoogleReCaptchaProvider>
)

export default WrappedRegisterForm
