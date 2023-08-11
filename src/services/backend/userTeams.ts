import { teams } from '@/lib/node_appwrite'

export const ensureTeamExists = (teamName: string, teamId: string): (() => Promise<void>) => {
  let teamEnsured = false
  return async () => {
    if (teamEnsured) return
    try {
      if (process.env.NODE_ENV === 'development') console.log(`Checking if ${teamName} team exists...`)
      await teams.get(teamId)
      if (process.env.NODE_ENV === 'development') console.log(`${teamName} team exists!`)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') console.log(`${teamName} team does not exist, creating...`)
      await teams.create(teamId, teamName)
      if (process.env.NODE_ENV === 'development') console.log(`${teamName} team created!`)
    } finally {
      teamEnsured = true
    }
  }
}

export const ADMIN_TEAM_NAME = 'Admin'
export const ADMIN_TEAM_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_TEAM_ID ?? ADMIN_TEAM_NAME
export const ensureAdminTeam = ensureTeamExists(ADMIN_TEAM_NAME, ADMIN_TEAM_ID)

export const REVIEWER_TEAM_NAME = 'Reviewer'
export const REVIEWER_TEAM_ID = process.env.NEXT_PUBLIC_APPWRITE_REVIEWER_TEAM_ID ?? REVIEWER_TEAM_NAME
export const ensureReviewerTeam = ensureTeamExists(REVIEWER_TEAM_NAME, REVIEWER_TEAM_ID)
