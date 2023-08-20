'use client'
import { differenceInSeconds } from 'date-fns'
import { useEffect, useState, type FC } from 'react'
import Typography from './ui/Typography'
import { css } from '@styled/css'

export interface CountDownProps {
  endDate: Date
}
interface remainingDate {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountDown: FC<CountDownProps> = ({ endDate }) => {
  const [remainingTime, setRemainingTime] = useState<remainingDate>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isFinished, setIsFinished] = useState(false)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = differenceInSeconds(endDate, now)
      if (difference <= 0) {
        clearInterval(interval)
        setIsFinished(true)
        return
      }
      const days = Math.floor(difference / 86400)
      const hours = Math.floor((difference % 86400) / 3600)
      const minutes = Math.floor((difference % 3600) / 60)
      const seconds = difference % 60
      setRemainingTime({ days, hours, minutes, seconds })
    }, 1000)
    return () => { clearInterval(interval) }
  }, [])
  if (isFinished) {
    return (
      <span>Finalizado</span>
    )
  }
  return (
    <Typography variant="subtitle2" className={css({ marginBlock: 'medium' })}>{remainingTime.days}d {remainingTime.hours}h {remainingTime.minutes}m {remainingTime.seconds}s</Typography>
  )
}

export default CountDown
