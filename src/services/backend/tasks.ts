import { Permission, Role, database } from '@/lib/node_appwrite'
import { DATABASE_ID, ensureDatabase } from '@/services/backend/database'
import { SUMMONER_INFO_COLLECTION_ID } from './summonerInfo'
import { ADMIN_TEAM_ID, REVIEWER_TEAM_ID, ensureReviewerTeam } from './userTeams'

export const TASKS_COLLECTION_NAME = 'tasks'
export const TASKS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID ?? TASKS_COLLECTION_NAME

export const ensureTasksCollection = (():(() => Promise<void>) => {
  let tasksCollectionEnsured = false
  return async () => {
    if (tasksCollectionEnsured) return
    try {
      await ensureDatabase()
      await ensureReviewerTeam()
      if (process.env.NODE_ENV === 'development') console.log('Checking if tasks collection exists...')
      await database.getCollection(DATABASE_ID, TASKS_COLLECTION_ID)
      if (process.env.NODE_ENV === 'development') console.log('Tasks collection exists!')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log('Tasks collection does not exist, creating...')
      const tasksPermissions = [
        Permission.create(Role.any()),
        Permission.read(Role.any()),
        Permission.update(Role.team(REVIEWER_TEAM_ID)),
        Permission.update(Role.team(ADMIN_TEAM_ID)),
        Permission.delete(Role.team(ADMIN_TEAM_ID))
      ]
      await database.createCollection(DATABASE_ID, TASKS_COLLECTION_ID, TASKS_COLLECTION_NAME, tasksPermissions, true)
      if (process.env.NODE_ENV === 'development') console.log('Tasks collection created, adding relationships...')
      await database.createRelationshipAttribute(DATABASE_ID, SUMMONER_INFO_COLLECTION_ID, TASKS_COLLECTION_ID, 'oneToMany', false, 'tasks', 'summoner', 'restrict')
      if (process.env.NODE_ENV === 'development') console.log('Tasks collection created, adding attributes...')
      const taskReviewStatus = ['pending', 'reviewing', 'approved', 'rejected']
      await database.createEnumAttribute(DATABASE_ID, TASKS_COLLECTION_ID, 'status', taskReviewStatus, false, 'pending')
      await database.createStringAttribute(DATABASE_ID, TASKS_COLLECTION_ID, 'task', 64, true)
      await database.createStringAttribute(DATABASE_ID, TASKS_COLLECTION_ID, 'notes', 256, false)
      await database.createStringAttribute(DATABASE_ID, TASKS_COLLECTION_ID, 'reviewer', 32, false)
      await database.createStringAttribute(DATABASE_ID, TASKS_COLLECTION_ID, 'reviewerNotes', 256, false)
      await database.createUrlAttribute(DATABASE_ID, TASKS_COLLECTION_ID, 'evidenceImage', true)
      await database.createUrlAttribute(DATABASE_ID, TASKS_COLLECTION_ID, 'evidenceOpGG', true)
      if (process.env.NODE_ENV === 'development') console.log('Tasks collection attributes added!')
    } finally {
      tasksCollectionEnsured = true
    }
  }
})()
