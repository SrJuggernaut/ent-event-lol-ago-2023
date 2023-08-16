import { Permission, Role, storage } from '@/lib/node_appwrite'
import { ADMIN_TEAM_ID, REVIEWER_TEAM_ID } from '@/services/backend/userTeams'

export const BUCKET_ID = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID ?? 'evidence_storage'

export const ensureStorage = (() => {
  let storageEnsured = false
  return async (): Promise<void> => {
    if (storageEnsured) return
    try {
      if (process.env.NODE_ENV === 'development') console.log('Checking if storage exists...')
      await storage.getBucket(BUCKET_ID)
      if (process.env.NODE_ENV === 'development') console.log('Storage exists!')
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log('Storage does not exist, creating...')
      const Permissions = [
        Permission.create(Role.guests()),
        Permission.create(Role.any()),
        Permission.read(Role.any()),
        Permission.update(Role.team(ADMIN_TEAM_ID)),
        Permission.update(Role.team(REVIEWER_TEAM_ID)),
        Permission.delete(Role.team(ADMIN_TEAM_ID))
      ]
      await storage.createBucket(BUCKET_ID, 'Evidence Storage', Permissions)
      if (process.env.NODE_ENV === 'development') console.log('Storage created!')
    } finally {
      storageEnsured = true
    }
  }
})()
