import { Permission, Role, database } from '@/lib/node_appwrite'
import { DATABASE_ID, ensureDatabase } from '@/services/backend/database'
import { ADMIN_TEAM_ID, ensureAdminTeam } from '@/services/backend/userTeams'

export const SUMMONER_INFO_COLLECTION_NAME = 'summoner_info'
export const SUMMONER_INFO_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SUMMONER_INFO_COLLECTION_ID ?? SUMMONER_INFO_COLLECTION_NAME

export const ensureSummonerInfoCollection = (() => {
  let collectionEnsured = false

  return async (): Promise<void> => {
    if (collectionEnsured) return
    await ensureDatabase()
    await ensureAdminTeam()
    try {
      if (process.env.NODE_ENV === 'development') console.log('Checking if summoner info collection exists...')
      await database.getCollection(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID)
      if (process.env.NODE_ENV === 'development') console.log('Summoner info collection exists!')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log('Summoner info collection does not exist, creating...')
      const summonerInfoPermissions = [
        Permission.create(Role.any()),
        Permission.read(Role.any()),
        Permission.update(Role.team(ADMIN_TEAM_ID)),
        Permission.delete(Role.team(ADMIN_TEAM_ID))
      ]
      await database.createCollection(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, SUMMONER_INFO_COLLECTION_NAME, summonerInfoPermissions, true)
      if (process.env.NODE_ENV === 'development') console.log('Summoner info collection created, adding attributes...')
      await database.createStringAttribute(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, 'summonerName', 32, true)
      await database.createEmailAttribute(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, 'email', true)
      if (process.env.NODE_ENV === 'development') console.log('Summoner info collection attributes added!')
    } finally {
      collectionEnsured = true
    }
  }
})()
