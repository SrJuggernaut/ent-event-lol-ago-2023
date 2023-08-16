import { NextResponse, type NextRequest } from 'next/server'
import { ValidationError, object, string } from 'yup'

const RECAPTCHA_SECRET = process.env.RECAPTCHA_SECRET ?? ''

const schema = object({
  token: string().required('El token es requerido')
})
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json()
    const { token } = await schema.validate(body)
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`, {
      method: 'POST',
      cache: 'no-cache'
    })
    const recaptchaResponse = await response.json()
    if (recaptchaResponse.success !== true) {
      throw new ValidationError('Token inválido')
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(error)
      return NextResponse.json({ error: error.message }, { status: 400 })
    } else {
      console.error(error)
      return NextResponse.json({ error: 'Error interno' }, { status: 500 })
    }
  }
}
