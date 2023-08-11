import { database } from '@/lib/node_appwrite'

const DATABASE_NAME = 'rancios_db'
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? DATABASE_NAME

export const ensureDatabase = ((): (() => Promise<void>) => {
  let databaseEnsured = false
  return async () => {
    if (databaseEnsured) return
    try {
      if (process.env.NODE_ENV === 'development') console.log('Checking if database exists...')
      await database.get(DATABASE_ID)
      if (process.env.NODE_ENV === 'development') console.log('Database exists!')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log('Database does not exist, creating...')
      await database.create(DATABASE_ID, DATABASE_NAME)
      if (process.env.NODE_ENV === 'development') console.log('Database created!')
    } finally {
      databaseEnsured = true
    }
  }
})()
