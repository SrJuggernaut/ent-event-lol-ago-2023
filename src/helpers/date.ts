import { format } from 'date-fns'

export const formatDate = (date: Date): string => {
  return format(date, 'dd/MM/yyyy - HH:mm:ss')
}

export const endDate = new Date('2023-08-23T23:59:59-0600')
