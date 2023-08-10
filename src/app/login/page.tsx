import Typography from '@/components/ui/Typography'
import { css, cx } from '@styled/css'
import { center } from '@styled/patterns'
import NextLink from 'next/link'
import { type FC } from 'react'
import LoginForm from './LoginForm'

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
        <Typography variant="h1" align="center">Iniciar Sesión</Typography>
        <LoginForm />
        <Typography variant="body1" align="center">¿No tienes una cuenta? <NextLink href="/register">Regístrate</NextLink></Typography>
      </div>
    </div>
  )
}

export default page
