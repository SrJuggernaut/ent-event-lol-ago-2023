import Typography from '@/components/ui/Typography'
import { css, cx } from '@styled/css'
import { center } from '@styled/patterns'
import NextLink from 'next/link'
import { type FC } from 'react'
import RegisterForm from './RegisterForm'

const page: FC = () => {
  return (
    <div
      className={cx(center(), css({ minHeight: 'calc(100vh - (72px * 2))' }))}
    >
      <div
        className={css({
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: 'border',
          borderRadius: 'medium',
          width: '100%',
          maxWidth: { smToXxl: 'breakpoint-sm' },
          padding: 'medium'
        })}
      >
        <Typography variant="h1" align="center">Registro</Typography>
        <RegisterForm />
        <Typography variant="body1" align="center">¿Ya tienes una cuenta? <NextLink href="/login">Inicia sesión</NextLink></Typography>
      </div>
    </div>
  )
}

export default page
