'use client'
import Button from '@/components/ui/Button'
import Typography from '@/components/ui/Typography'
import { css } from '@styled/css'
import { useEffect, useState, type FC } from 'react'
import { type SummonerData } from './page'

export interface PuntuacionnTableProps {
  data: SummonerData[]
}

const PuntuacionTable: FC<PuntuacionnTableProps> = ({ data }) => {
  const [show, setShow] = useState<'all' | 'top10'>('top10')
  const [currentData, setCurrentData] = useState(data)

  useEffect(() => {
    if (show === 'all') {
      setCurrentData(data)
    } else if (show === 'top10') {
      setCurrentData(data.slice(0, 10))
    }
  }, [show])

  return (
    <>
      <div
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'medium',
          padding: 'small'
        })}
      >
        <Button
          onClick={() => { setShow('top10') }}
          disabled={show === 'top10'}
        >
          Mostrar top 10
        </Button>
        <Button
          onClick={() => { setShow('all') }}
          disabled={show === 'all'}
        >
          Mostrar todos
        </Button>
      </div>
      <div
        className={css({
          minHeight: '60vh'
        })}
      >
        <div
          className={css({
            display: 'grid',
            gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: '1fr 2fr' },
            gap: 'medium',
            padding: 'small'
          })}
        >
          <Typography variant='h2' component="span" >Nombre de invocador</Typography>
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              alignItems: 'center',
              justifyItems: 'center'
            })}
          >
            <Typography className={css({ fontSize: 'h3', color: 'danger', fontFamily: 'heading', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' })}component="span">Pendientes<a href="#pendientes">*</a></Typography>
            <Typography className={css({ fontSize: 'h3', color: 'success', fontFamily: 'heading', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' })}component="span">Aprobados<a href="#aprobados">*</a></Typography>
            <Typography className={css({ fontSize: 'h3', color: 'info', fontFamily: 'heading', WebkitTextStrokeWidth: '1px', WebkitTextStrokeColor: 'black' })}component="span">Totales<a href="#totales">*</a></Typography>
          </div>
        </div>
        {currentData.map((summoner) => (
          <div
            className={css({
              display: 'grid',
              gridTemplateColumns: { base: '1fr', md: '1fr 1fr', lg: '1fr 2fr' },
              gap: 'medium',
              padding: 'small'
            })}
            key={summoner.id}
          >
            <div>
              <Typography variant='h3' component="span" >{summoner.summonerName}</Typography>
            </div>
            <div
              className={css({
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 'small',
                alignItems: 'center',
                justifyItems: 'center'
              })}
            >
              <Typography className={css({ fontSize: 'h3', color: 'danger', fontFamily: 'body', fontWeight: '700' })} component="span">{summoner.pendingPoints}</Typography>
              <Typography className={css({ fontSize: 'h3', color: 'success', fontFamily: 'body', fontWeight: '700' })} component="span">{summoner.approvedPoints}</Typography>
              <Typography className={css({ fontSize: 'h3', color: 'info', fontFamily: 'body', fontWeight: '700' })} component="span">{summoner.pendingPoints + summoner.approvedPoints}</Typography>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default PuntuacionTable
