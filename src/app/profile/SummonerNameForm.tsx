import Input from '@/components/ui/Input'
import Typography from '@/components/ui/Typography'
import useAppSelector from '@/hooks/useAppSelector'
import { updateUserPreferences } from '@/services/frontend/session'
import { createSummonerInfo } from '@/services/frontend/summonerInfo'
import { type SummonerData } from '@/types/summonerInfo'
import { css, cx } from '@styled/css'
import { button } from '@styled/recipes'
import { useFormik } from 'formik'
import { useEffect, useState, type FC } from 'react'
import { object, string } from 'yup'

const summonerDataSchema = object({
  summonerName: string().required('El nombre de invocador es requerido'),
  email: string().email('El email no es válido').required('El email es requerido')
})

const SummonerNameForm: FC = () => {
  const { user } = useAppSelector((state) => state.session)
  const [isDataOnline, setIsDataOnline] = useState(false)

  const formik = useFormik<SummonerData>({
    initialValues: {
      userId: '',
      summonerName: '',
      email: ''
    },
    onSubmit: async (values) => {
      const summonerData = await createSummonerInfo(values)
      const preferences = await updateUserPreferences({ summonerName: summonerData.summonerName })
      if (summonerData !== undefined && preferences !== undefined) {
        setIsDataOnline(true)
      }
    },
    validationSchema: summonerDataSchema
  })

  useEffect(() => {
    if (user?.prefs.summonerName !== undefined) {
      formik.setValues({
        userId: '',
        summonerName: user.prefs.summonerName,
        email: user.email
      })
        .then(() => {
          setIsDataOnline(true)
        })
        .catch((error) => {
          console.error(error)
        })
    } else if (user?.email !== undefined) {
      formik.setValues({
        userId: user.$id,
        summonerName: '',
        email: user.email
      })
        .then(() => {
          setIsDataOnline(false)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }, [user])

  return (
    <>
      <Typography variant="h2" align="center">Nombre de invocador</Typography>
      <Typography>
        Para poder participar en el evento debes introducir tu nombre de invocador de League of Legends, <Typography color="danger" component="span">una vez guardado no puede ser modificado</Typography>
      </Typography>
      <form
        onSubmit={formik.handleSubmit}
      >
        <div
          className={css({
            marginBottom: 'medium'
          })}
        >
          <label htmlFor="summonerName">Introduce tu Nombre de invocador</label>
          <Input
            id="summonerName"
            name="summonerName"
            placeholder="Nombre de invocador"
            type="text"
            required
            value={formik.values.summonerName}
            onChange={formik.handleChange}
            disabled={isDataOnline}
            fullWidth
          />
        </div>
        <button
          className={cx(button({ variant: 'solid' }), css({
            '&:disabled': {
              backgroundColor: 'gray.200',
              color: 'gray.400',
              cursor: 'not-allowed',
              opacity: '1',
              '&:hover': {
                backgroundColor: 'gray.200',
                color: 'gray.400',
                cursor: 'not-allowed'
              },
              '&:active': {
                backgroundColor: 'gray.200',
                color: 'gray.400',
                cursor: 'not-allowed',
                boxShadow: 'none'
              }
            }
          }))}
          type="submit"
          disabled={isDataOnline}
        >
          Guardar
        </button>
      </form>
    </>
  )
}

export default SummonerNameForm
